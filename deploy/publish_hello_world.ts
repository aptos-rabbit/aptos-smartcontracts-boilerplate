/** AptosAccount provides methods around addresses, key-pairs */
import { AptosAccount, TxnBuilderTypes, BCS, MaybeHexString, HexString, FaucetClient } from "aptos";
import { publishModule } from "./publish_module";
import assert from "assert";
import fs from "fs";
import { NODE_URL, FAUCET_URL } from "../config";

const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

async function main() {
  // TODO: 
  // new account
  // fund account
  // contract docker build with account name
  // publish with this account
  // Create two accounts, Alice and Bob, and fund Alice but not Bob
  const publisherPrivateKey = Uint8Array.from(Buffer.from("4debe8de4473d006b7259dfb5c4b63936bed2152d3fb492d0e77a6653a56e435", 'hex'));
  const publisher = new AptosAccount(publisherPrivateKey, "0xc935a8ef7cb5899d9172a1ea0098bd4d103c40e6224f7c3e03795d0733db828b");
  await faucetClient.fundAccount(publisher.address(), 5_000);
  const moduleHex = fs.readFileSync("./build/HelloBlockchain/bytecode_modules/Message.mv").toString("hex");
  console.log("module hex: ", moduleHex);
  const hashPublish = await publishModule(publisher, moduleHex);
  console.log("\n=== publish done ===");
  console.log("\n=== publish hash ===");
  console.log(hashPublish);
}

if (require.main === module) {
  main().then((resp) => console.log(resp));
}