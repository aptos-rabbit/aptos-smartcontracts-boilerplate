// SPDX-License-Identifier: Apache-2.0

import { NODE_URL, FAUCET_URL } from "../config";
import { AptosAccount, TxnBuilderTypes, BCS, MaybeHexString } from "aptos";
import { AptosClient, FaucetClient } from "aptos";

const client = new AptosClient(NODE_URL);

export async function accountBalance(accountAddress: MaybeHexString): Promise<number | null> {
  const resource = await client.getAccountResource(accountAddress, "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
  if (resource == null) {
    return null;
  }

  return parseInt((resource.data as any)["coin"]["value"]);
}

/**
 * Transfers a given coin amount from a given accountFrom to the recipient's account address.
 * Returns the transaction hash of the transaction used to transfer.
 */
async function transfer(accountFrom: AptosAccount, recipient: MaybeHexString, amount: number): Promise<string> {
  const token = new TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString("0x1::aptos_coin::AptosCoin"));

  const scriptFunctionPayload = new TxnBuilderTypes.TransactionPayloadScriptFunction(
    TxnBuilderTypes.ScriptFunction.natural(
      "0x1::coin",
      "transfer",
      [token],
      [BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(recipient)), BCS.bcsSerializeUint64(amount)],
    ),
  );

  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    client.getAccount(accountFrom.address()),
    client.getChainId(),
  ]);

  const rawTxn = new TxnBuilderTypes.RawTransaction(
    TxnBuilderTypes.AccountAddress.fromHex(accountFrom.address()),
    BigInt(sequenceNumber),
    scriptFunctionPayload,
    1000n,
    1n,
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new TxnBuilderTypes.ChainId(chainId),
  );

  const bcsTxn = AptosClient.generateBCSTransaction(accountFrom, rawTxn);
  const pendingTxn = await client.submitSignedBCSTransaction(bcsTxn);

  return pendingTxn.hash;
}

//<:!:section_5
//:!:>section_6
/** Faucet creates and funds accounts. */
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Pass wallet address");
    process.exit(1);
  }

  // Create two accounts, Alice and Bob, and fund Alice but not Bob
  const alice = new AptosAccount();
  const bob = new AptosAccount();
  const stakingAccountAddress = "0xd3e84fde630a9803ea6e1dc89b1b587fa3efd3cf9817f6f360e59df0469a5fdc";
  const burn = "0x0000000000000000000000000000000000000000000000000000000000000000";

  console.log("\n=== Addresses ===");
  console.log(
    `Alice: ${alice.address()}. Key Seed: ${Buffer.from(alice.signingKey.secretKey).toString("hex").slice(0, 64)}`,
  );
  console.log(`Bob: ${bob.address()}. Key Seed: ${Buffer.from(bob.signingKey.secretKey).toString("hex").slice(0, 64)}`);

  await faucetClient.fundAccount(alice.address(), 5_000);
  
  await faucetClient.fundAccount(bob.address(), 0);
  await faucetClient.fundAccount(burn, 0);

  console.log("\n=== Initial Balances ===");
  console.log(`Alice: ${await accountBalance(alice.address())}`);
  console.log(`Bob: ${await accountBalance(bob.address())}`);

  // Have Alice give Bob 1000 coins
  const txHash = await transfer(alice, burn, 1_000);
  //const txHashStaking = await transfer(alice, stakingAccountAddress, 1_200);
  // await client.waitForTransaction(txHash);
  await client.waitForTransaction(txHash);
  

  console.log("\n=== Final Balances ===");
  console.log(`Alice: ${await accountBalance(alice.address())}`);
  console.log(`Bob: ${await accountBalance(bob.address())}`);
  console.log(`Staking: ${await accountBalance(stakingAccountAddress)}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
