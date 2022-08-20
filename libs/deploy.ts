import { compile, getNamedParametersFromToml } from "./compile";
import { aptosClient, faucetClient } from "../config";
import fs from "fs";
/** AptosAccount provides methods around addresses, key-pairs */
import { AptosAccount, AptosClient, TxnBuilderTypes, BCS, MaybeHexString, HexString } from "aptos";
import { Transaction_UserTransaction } from "aptos/dist/generated/models/Transaction_UserTransaction";

/** Publish a new module to the blockchain within the specified account */
export async function publishModule(accountFrom: AptosAccount, moduleHex: string): Promise<Transaction_UserTransaction> {
  const moudleBundlePayload = new TxnBuilderTypes.TransactionPayloadModuleBundle(
    new TxnBuilderTypes.ModuleBundle([new TxnBuilderTypes.Module(new HexString(moduleHex).toUint8Array())]),
  );

  const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
    aptosClient.getAccount(accountFrom.address()),
    aptosClient.getChainId(),
  ]);

  const rawTxn = new TxnBuilderTypes.RawTransaction(
    TxnBuilderTypes.AccountAddress.fromHex(accountFrom.address()),
    BigInt(sequenceNumber),
    moudleBundlePayload,
    1000n,
    1n,
    BigInt(Math.floor(Date.now() / 1000) + 10),
    new TxnBuilderTypes.ChainId(chainId),
  );

  const bcsTxn = AptosClient.generateBCSTransaction(accountFrom, rawTxn);
  const transactionRes = await aptosClient.submitSignedBCSTransaction(bcsTxn);
  await faucetClient.waitForTransaction(transactionRes.hash);
  const transaction = await faucetClient.getTransactionByHash(transactionRes.hash) as Transaction_UserTransaction;
  return transaction;
}

export async function publishModuleFromFile(accountFrom: AptosAccount, modulePath: string): Promise<Transaction_UserTransaction> {
  const moduleHex = fs.readFileSync(modulePath).toString("hex");
  return await publishModule(accountFrom, moduleHex);
}