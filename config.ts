require('dotenv').config()
import { AptosAccount, AptosClient, FaucetClient } from "aptos";

export const NODE_URL = process.env.NODE_URL || "http://127.0.0.1:8080";
export const FAUCET_URL = process.env.FAUCET_URL || "http://127.0.0.1:8000";

export const PUBLIC_KEY = process.env.PUBLIC_KEY || "";
export const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

export const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
export const aptosClient = new AptosClient(NODE_URL);

const publisherPrivateKey = Uint8Array.from(Buffer.from(PRIVATE_KEY.replace("0x", ""), 'hex'));
export const publisherAccount = !PUBLIC_KEY? undefined : new AptosAccount(publisherPrivateKey, PUBLIC_KEY);