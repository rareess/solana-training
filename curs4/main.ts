import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMemoInstruction } from '@solana/spl-memo';

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const sender = getKeypairFromEnvironment("SECRET_KEY");
const receiver = new PublicKey("E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS");

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

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

console.log({signature});