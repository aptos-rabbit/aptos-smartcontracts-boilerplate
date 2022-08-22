require('dotenv').config()
import { aptosClient } from "../config";
import { AptosAccount, AptosClient, BCS, MaybeHexString, TxnBuilderTypes } from "aptos";
/**
 * Transfers a given coin amount from a given accountFrom to the recipient's account address.
 * Returns the transaction hash of the transaction used to transfer.
 */
 export async function transfer(accountFrom: AptosAccount, recipient: MaybeHexString, amount: number): Promise<string> {
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
        aptosClient.getAccount(accountFrom.address()),
        aptosClient.getChainId(),
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
    const pendingTxn = await aptosClient.submitSignedBCSTransaction(bcsTxn);
  
    return pendingTxn.hash;
  }

export async function accountBalance(accountAddress: MaybeHexString): Promise<number | null> {
  const resource = await aptosClient.getAccountResource(accountAddress, "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
  if (resource == null) {
    return null;
  }

  return parseInt((resource.data as any)["coin"]["value"]);
}