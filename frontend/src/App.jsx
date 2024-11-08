import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [publicKey, setPublicKey] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleAirdrop = async () => {
    if (!publicKey || !amount) {
      alert('Please enter a valid public key and amount!');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid positive number for the amount.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:3001/api/airdrop', {
        publicKey,
        amount: Number(amount),
      });

      if (response.status === 200) {
        setMessage(`Airdrop successful! Tx: ${response.data.signature}`);
      } else {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error('Airdrop failed:', error);
      setMessage('Airdrop failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-5xl font-bold mb-6">Soldop</div>
      <div className="text-lg font-bold mb-6">Shrey Solana Devnet Airdrop</div>

      <input
        type="text"
        placeholder="Enter your Solana public key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        className="w-full max-w-md p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Enter amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full max-w-md p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleAirdrop}
        disabled={loading}
        className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-300 ${
          loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Claim Airdrop'}
      </button>

      {message && (
        <p className="mt-4 text-center text-lg text-green-600">
          {message}
        </p>
      )}
    </div>
  );
};

export default App;
