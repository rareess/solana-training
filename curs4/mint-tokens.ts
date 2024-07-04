import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";

import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const recipientAddr = 'BZx1fAF9vC1E9yCR6NzL5vvrcZPJSPzUiExGwchEtL7q';
const tokenMintAddr = '7ZNwRqCYPFThP4dyFyjLvo1pdRiLwK6kdw5DwL3NnknY';

const recipientPK = new PublicKey(recipientAddr);
const tokenMintPK = new PublicKey(tokenMintAddr);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, user, tokenMintPK, recipientPK
)

console.log({ tokenAccount: tokenAccount.address.toBase58() });


const mintTransaction = await mintTo(connection, user, tokenMintPK, tokenAccount.address, user, 100 * MINOR_UNITS_PER_MAJOR_UNITS);

const link = getExplorerLink("transaction", mintTransaction, "devnet");

console.log({ link });