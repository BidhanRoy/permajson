export const TextAreaContainer = (inputValue, onInputChange) => {
    return (
        <textarea
            className="textarea"
            id="data"
            name="data"
            autoFocus=""
            placeholder="{}"
            rows="5"
            value={inputValue}
            onChange={onInputChange}
        >
        </textarea>
    )
};

export const ButtonContainer = (validateJson) => {
    return (
        <button
            type="button"
            name="process"
            className="button is-action is-medium"
            onClick={validateJson}
        >
            save
        </button>
    )
};

const connectWallet = async () => {
    const { arweaveWallet } = window;
    console.log('wallet ', arweaveWallet)

    if (arweaveWallet) {
        await arweaveWallet.connect(["ACCESS_ADDRESS"])
        
        const walletAddress = await arweaveWallet.getActiveAddress()
        console.log('Wallet address ', walletAddress)
    }
  };

export const renderNotConnectedContainer = () => (
    <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
    >
        Connect to Wallet
    </button>
);
