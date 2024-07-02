import "dotenv/config";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import bs58 from 'bs58';

const keypair = getKeypairFromEnvironment("SECRET_KEY");

// console.log(
//   `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
// );


const connection = new Connection(clusterApiUrl("devnet"));

console.log('Hai in cluster');

const publicKey = new PublicKey(keypair.publicKey);

try {

  await airdropIfRequired(connection, publicKey, 2 * LAMPORTS_PER_SOL, 10 * LAMPORTS_PER_SOL);
} catch (e) {
  console.log(e);
  console.log('nu-ti dau airdrop');
}

const balanceInLamport = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamport / LAMPORTS_PER_SOL;

const key = bs58.encode(keypair.secretKey);

console.log({key});

console.log({ publicKey: publicKey.toString(), balanceInLamport, balanceInSOL });