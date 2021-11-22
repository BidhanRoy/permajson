export const TextAreaContainer = (inputValue, setInputValue) => {
    const onInputChange = (event) => {
        const { value } = event.target;
        setInputValue(value);
    };

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

export const ButtonContainer = (inputValue, setInputValue) => {
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

const connectWallet = async (setWalletAddress) => {
    const { arweaveWallet } = window;
    console.log('wallet ', arweaveWallet)

    if (arweaveWallet) {
        await arweaveWallet.connect(["ACCESS_ADDRESS"])

        const address = await arweaveWallet.getActiveAddress()
        setWalletAddress(address.toString())
        console.log('Wallet address ', address)
    }
};

export const renderNotConnectedContainer = (walletAddress, setWalletAddress) => (
    <button
        className="cta-button connect-wallet-button"
        onClick={() => connectWallet(setWalletAddress)}
    >
        Connect to Wallet
    </button>
);
