import React, { FC, useEffect, useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const BalanceSOL: FC = () => {


  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const [balance, setBalance] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (publicKey && connection) {
      console.log('get balance');

      connection.getBalance(publicKey).then((nr) => {
        const sol = nr / LAMPORTS_PER_SOL;
        console.log({nr, sol});
        setBalance(sol);
      })
    }
  }, [connection, publicKey])


  return <div>Balance: {balance}</div>
}


export default BalanceSOL;