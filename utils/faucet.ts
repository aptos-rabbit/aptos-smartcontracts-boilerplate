import { faucetClient, aptosClient, PUBLIC_KEY } from "../config";
import { accountBalance } from "./utils";

async function main() {
  const args = process.argv.slice(2);

  let walletAddress;
  if (args.length < 1) {
    if (!PUBLIC_KEY) {
      console.error('Please provide your PUBLIC_KEY in .env file or console argument');
      process.exit(1);
    }
    walletAddress = PUBLIC_KEY;
  } else {
    walletAddress = args[0];
  }

  // need to fund with zero value to initiate storage. For the account which is not on the blockchain
  const txHashes0 = await faucetClient.fundAccount(walletAddress, 0);
  await aptosClient.waitForTransaction(txHashes0[0]);

  console.log(`Balance before: ${await accountBalance(walletAddress)}`);
  // increase amount of wallet by 5000
  const txHashes = await faucetClient.fundAccount(walletAddress, 5_000);
  await aptosClient.waitForTransaction(txHashes[0]);
  console.log(`Balance after: ${await accountBalance(walletAddress)}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
