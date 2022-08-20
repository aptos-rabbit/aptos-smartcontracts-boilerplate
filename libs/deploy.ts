import { compile, getNamedParametersFromToml } from "./compile";
import { aptosClient } from "../config";

/** AptosAccount provides methods around addresses, key-pairs */
import { AptosAccount, AptosClient, TxnBuilderTypes, BCS, MaybeHexString, HexString } from "aptos";

/** Publish a new module to the blockchain within the specified account */
export async function publishModule(accountFrom: AptosAccount, moduleHex: string): Promise<string> {
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

  return transactionRes.hash;
}
