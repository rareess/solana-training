import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const user = getKeypairFromEnvironment("SECRET_KEY");

console.log({ publicKey: user.publicKey.toBase58() })

const tokenMint = await createMint(
    connection, user, user.publicKey, null, 2
)

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`Token Mint: ${link}`)