/** AptosAccount provides methods around addresses, key-pairs */
import { AptosAccount, TxnBuilderTypes, BCS, MaybeHexString, HexString, FaucetClient } from "aptos";
import { publishModule } from "./publish_module";
import assert from "assert";
import fs from "fs";
import { NODE_URL, FAUCET_URL } from "../config";

const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

async function main() {
  // Create two accounts, Alice and Bob, and fund Alice but not Bob
  const publisherPrivateKey = Uint8Array.from(Buffer.from("d18aceadb73109bd36fe80fe0e51ba2f3d92a709a1325d5d89962842867e485c", 'hex'));
  const publisher = new AptosAccount(publisherPrivateKey, "0xd3e84fde630a9803ea6e1dc89b1b587fa3efd3cf9817f6f360e59df0469a5fdc");
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