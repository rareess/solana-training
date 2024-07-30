import React, { useState } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';

const SendAmount = () => {

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const [amount, setAmount] = useState(0);
	const [addr, setAddr] = useState('');

	const onClick = async () => {

		const addrPublicKey = new PublicKey(
			addr || "AMhdHJ83EQnFRp3DXKr9NCJxZCUjjoqpHf63XnuYT81G",
		);

		const solToSend = amount * LAMPORTS_PER_SOL;

		const transaction = new Transaction();

		const instruction = SystemProgram.transfer({
			fromPubkey: publicKey,
			toPubkey: addrPublicKey,
			lamports: solToSend
		});;

		transaction.add(instruction);

		const signature = await sendTransaction(transaction, connection);
		console.log(signature);
	}

	return <div>
		<div>
			<label htmlFor="amount">Amount (in SOL) to send: </label>
			<input type="number" min="0" step=".01" name="amount" id="amount" value={amount} onChange={(e) => setAmount(+e.target.value)}></input>
		</div>

		<div>
			<label htmlFor="addr">Send SOL to:</label>
			<input name="addr" id="addr" value={addr} onChange={(e) => setAddr(e.target.value)}></input>
		</div>
		<button onClick={onClick}>Send</button>
	</div>
};

export default SendAmount;