const express = require('express');
const { Connection, Keypair, PublicKey, SystemProgram, Transaction } = require('@solana/web3.js');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const airdropWallet = Keypair.fromSecretKey(Uint8Array.from([101,41,39,212,198,168,39,97,243,42,0,201,13,155,49,188,62,249,51,161,250,101,63,176,84,17,24,212,68,122,59,97,108,14,124,182,159,119,72,175,203,0,19,1,248,103,92,145,147,233,214,136,100,151,87,73,32,86,131,108,19,249,12,65]));

app.post('/api/airdrop', async (req, res) => {
  try {
    const { publicKey, amount } = req.body;

    if (!publicKey || !amount) {
      return res.status(400).json({ error: 'Public key and amount are required' });
    }

    const lamports = amount * 1000000000;

    const recipient = new PublicKey(publicKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: airdropWallet.publicKey,
        toPubkey: recipient,
        lamports,
      })
    );

    const signature = await connection.sendTransaction(transaction, [airdropWallet]);
    await connection.confirmTransaction(signature);

    res.status(200).json({ message: 'Airdrop successful', signature });
  } catch (error) {
    console.error('Airdrop error:', error);
    res.status(500).json({ error: 'Airdrop failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
