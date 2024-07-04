import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from 'bs58';

const user = getKeypairFromEnvironment("SECRET_KEY_2");

console.log(user.publicKey.toBase58());
console.log(bs58.encode(user.secretKey));