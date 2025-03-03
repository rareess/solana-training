import React, { useMemo } from "react";
import { FC, ReactNode } from "react";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js';
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
require("@solana/wallet-adapter-react-ui/styles.css");

interface WalletContextProviderProps {
	children: ReactNode;
}

const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
	const endpoint = web3.clusterApiUrl("devnet");
	const wallets = useMemo(() => [], []);
	return (<ConnectionProvider endpoint={endpoint}>
		<WalletProvider wallets={wallets}>
			<WalletModalProvider>{children}</WalletModalProvider>
		</WalletProvider>
	</ConnectionProvider>);
}

export default WalletContextProvider;