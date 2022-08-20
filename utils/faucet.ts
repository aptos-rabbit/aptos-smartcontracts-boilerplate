import { faucetClient, aptosClient, PUBLIC_KEY } from "../config";
import { faucet } from "../libs/faucet";

async function main() {
  const args = process.argv.slice(2);

  let walletAddress = "";
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
  const txHash = await faucet(walletAddress, 5000);
  console.log(`Hash result: ${txHash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
