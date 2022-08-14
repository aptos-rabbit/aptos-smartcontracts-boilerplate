/** AptosAccount provides methods around addresses, key-pairs */
import { AptosAccount, TxnBuilderTypes, BCS, MaybeHexString, HexString, FaucetClient } from "aptos";
import { publishModule } from "./publish_module";
import assert from "assert";
import fs from "fs";
import { NODE_URL, FAUCET_URL } from "../config";

const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

async function main() {
  // Create two accounts, Alice and Bob, and fund Alice but not Bob
  const publisher = new AptosAccount();
  await faucetClient.fundAccount(publisher.address(), 5_000);
  const moduleHex = fs.readFileSync("./modules/hello_world.move").toString("hex");
  console.log("module hex: ", moduleHex);
  const hashPublish = await publishModule(publisher, moduleHex);
  console.log("\n=== publish done ===");
  console.log("\n=== publish hash ===");
  console.log(hashPublish);
}

if (require.main === module) {
  main().then((resp) => console.log(resp));
}