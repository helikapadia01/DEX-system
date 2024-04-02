import React, { useState } from 'react';
import styles from '../styles/tokenSwap.module.css'; // Adjust this path to your SCSS module

// Example tokens list
const tokens = [
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Dai Stablecoin', symbol: 'DAI' },
    // Add more tokens as needed
];

function TokenSwap() {
    const [fromToken, setFromToken] = useState(tokens[0].symbol);
    const [toToken, setToToken] = useState(tokens[1].symbol);
    const [amount, setAmount] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState('');

    // Placeholder function for estimating received amount
    // In a real application, you would replace this with a call to a DeFi service API
    const calculateEstimatedAmount = (amount) => {
        // Placeholder logic; real logic would depend on current exchange rates
        const estimated = amount * 0.95; // Assume a 5% slippage
        setEstimatedAmount(estimated.toFixed(2));
    };

    const handleAmountChange = (event) => {
        const inputAmount = event.target.value;
        setAmount(inputAmount);
        calculateEstimatedAmount(inputAmount);
    };

    const handleSwap = () => {
        alert(`Swapping ${amount} ${fromToken} for ${estimatedAmount} ${toToken}`);
        // Here you would integrate with a DeFi protocol to perform the swap
    };

    return (
        <div className={styles.tokenSwapContainer}>
            <h2>Token Swap</h2>
            <div className={styles.swapForm}>
                <div className={styles.fieldGroup}>
                    <label>From:</label>
                    <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
                        {tokens.map((token) => (
                            <option key={token.symbol} value={token.symbol}>{token.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.fieldGroup}>
                    <label>To:</label>
                    <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
                        {tokens.map((token) => (
                            <option key={token.symbol} value={token.symbol}>{token.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.fieldGroup}>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={handleAmountChange} />
                </div>
                <div className={styles.fieldGroup}>
                    <label>Estimated Received:</label>
                    <input type="text" value={estimatedAmount} readOnly />
                </div>
                <button onClick={handleSwap}>Swap</button>
            </div>
        </div>
    );
}

export default TokenSwap;
