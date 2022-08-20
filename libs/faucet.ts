import { faucetClient, aptosClient } from "../config";
import { accountBalance } from "./account";

export async function faucet(walletAddress: string, amount: number): Promise<string> {
  // need to fund with zero value to initiate storage. For the account which is not on the blockchain
  const txHashes0 = await faucetClient.fundAccount(walletAddress, 0);
  await aptosClient.waitForTransaction(txHashes0[0]);

  console.log(`Balance before: ${await accountBalance(walletAddress)}`);
  // increase amount of wallet by 5000
  const txHashes = await faucetClient.fundAccount(walletAddress, amount);
  await aptosClient.waitForTransaction(txHashes[0]);
  console.log(`Balance after: ${await accountBalance(walletAddress)}`);
  return txHashes[0];
}

