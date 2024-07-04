import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

const recipientAddr = 'BZx1fAF9vC1E9yCR6NzL5vvrcZPJSPzUiExGwchEtL7q';
const tokenMintAddr = '7ZNwRqCYPFThP4dyFyjLvo1pdRiLwK6kdw5DwL3NnknY';

const recipientPK = new PublicKey(recipientAddr);
const tokenMintPK = new PublicKey(tokenMintAddr);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, user, tokenMintPK, user.publicKey
)

const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, user, tokenMintPK, recipientPK
);

const link = getExplorerLink("address", recipientTokenAccount.address.toString(), "devnet");

console.log({ link });

const transferTx = await transfer(connection, user, tokenAccount.address, recipientTokenAccount.address, user.publicKey, 0.001 * LAMPORTS_PER_SOL);

const transferLink = getExplorerLink("transaction", transferTx, "devnet");

console.log({ transferLink });