// SPDX-License-Identifier: Apache-2.0

import { NODE_URL, FAUCET_URL, faucetClient, aptosClient } from "../config";
import { AptosAccount, TxnBuilderTypes, BCS, MaybeHexString } from "aptos";
import { AptosClient, FaucetClient } from "aptos";
import { accountBalance, transfer } from "./utils";

//<:!:section_5
//:!:>section_6
/** Faucet creates and funds accounts. */
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
  await aptosClient.waitForTransaction(txHash);
  

  console.log("\n=== Final Balances ===");
  console.log(`Alice: ${await accountBalance(alice.address())}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
