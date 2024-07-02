import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMemoInstruction } from '@solana/spl-memo';


const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log({ senderPublicKey: sender.publicKey.toBase58() });


const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


const receiver = new PublicKey("E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS");

const balanceInLamport = await connection.getBalance(receiver);
const balanceInSOL = balanceInLamport / LAMPORTS_PER_SOL;

console.log({ balanceInSOL });


const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.1 * LAMPORTS_PER_SOL
});

const memo = 'Salut';

const memoInstruction = createMemoInstruction(memo);

transaction.add(transferInstruction);
transaction.add(memoInstruction);

const recentBlockhash = await connection.getLatestBlockhash();

if(recentBlockhash) {
  transaction.recentBlockhash = recentBlockhash.blockhash;
  transaction.feePayer = sender.publicKey;

  const fee = await transaction.getEstimatedFee(connection);

  fee && console.log({fee: fee / LAMPORTS_PER_SOL});
}


const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log({signature});