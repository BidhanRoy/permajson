import { useEffect, useState } from 'react';
import { TextAreaContainer, ButtonContainer, renderNotConnectedContainer } from './Containers.js';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('{}');
  const [walletAddress, setWalletAddress] = useState(null);

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const validateJson = async () => {
    console.log('validating...', inputValue)

    try {
      var parsedInputJson = JSON.parse(inputValue);
      if (parsedInputJson && typeof parsedInputJson === "object") {
        console.log('valid json! ', parsedInputJson)
        setInputValue(JSON.stringify(parsedInputJson, null, 2))

        return parsedInputJson;
      }
    }
    catch (e) {
      console.log('invalid json')
      alert('Invalid Json String!')
    }
  }


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

  useEffect(() => {
    window.addEventListener('load', async (event) => {
      await isWalletConnected();
    });

  }, []);

  useEffect(() => {
    if (!walletAddress) {
        return;
    }

    console.log('refresh!')
  }, [walletAddress]);


  return (
    <div className="App-body">
      {walletAddress && TextAreaContainer(inputValue, onInputChange)}
      {walletAddress && ButtonContainer(validateJson)}
      {!walletAddress && renderNotConnectedContainer()}
    </div>
  );
}

export default App;
