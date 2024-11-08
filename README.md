# Soldop

**Author**: Shrey Tarsaria

Soldop is a web application that allows users to receive airdrops on the Solana Devnet. Users can enter their Solana public key and specify the amount of SOL tokens they wish to receive. The backend handles secure transactions on the Solana blockchain, making it a great starting point for integrating Solana-based functionalities.

## Features
- Airdrop SOL tokens to any public key on the Solana Devnet.
- Real-time feedback on transaction status.
- Frontend validation for user input.
- Blockchain integration using Solana Web3.js.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, Solana Web3.js
- **Blockchain**: Solana Devnet

## Project Structure
```plaintext
soldop/
├── frontend/
│   ├── src/
│   │   ├── app.jsx         # Main React component
│   │   └── index.js        # Entry point
│   ├── public/
│   └── package.json
└── backend/
    ├── server/
    │   └── index.js        # Express server with Solana integration
    ├── package.json
