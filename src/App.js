import { useEffect, useState } from 'react';
import { TextAreaContainer, ButtonContainer, renderNotConnectedContainer } from './Containers.js';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('{}');
  const [walletAddress, setWalletAddress] = useState(null);

  const isWalletConnected = async () => {
    try {
      const { arweaveWallet } = window;
      console.log('arweaveWallet ', arweaveWallet);

      if (arweaveWallet) {
        console.log("Wallet found!");

        const address = await arweaveWallet.getActiveAddress()

        console.log('Connected with address:', address);

        setWalletAddress(address.toString());
      }
    } catch (error) {
      console.error('Got this error: ', error);
    }
  };

  // Check if wallet is connected on page load.
  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await isWalletConnected();
    });

  }, []);

  // Check if walletAddress variable has been updated.
  useEffect(() => {
    if (!walletAddress) {
      return;
    }

    console.log('refresh!')
  }, [walletAddress]);


  return (
    <div className="App-body">
      {walletAddress && TextAreaContainer(inputValue, setInputValue)}
      {walletAddress && ButtonContainer(inputValue, setInputValue)}
      {!walletAddress && renderNotConnectedContainer(walletAddress, setWalletAddress)}
    </div>
  );
}

export default App;
