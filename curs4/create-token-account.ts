import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

const recipientAddr = 'BZx1fAF9vC1E9yCR6NzL5vvrcZPJSPzUiExGwchEtL7q';
const tokenMintAddr = '7ZNwRqCYPFThP4dyFyjLvo1pdRiLwK6kdw5DwL3NnknY';

const recipient = new PublicKey(recipientAddr);
const tokenMintAccount = new PublicKey(tokenMintAddr);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection, user, tokenMintAccount, recipient
)

const link = getExplorerLink("address", tokenAccount.address.toString(), "devnet");
console.log({ link });