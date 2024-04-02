import React, { useState, useEffect } from 'react';
import styles from '../styles/tokenHistory.module.css'; // Ensure the path matches your file structure

function TokenHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const url = 'https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30&interval=daily';
            try {
                const response = await fetch(url);
                const data = await response.json();
                setHistory(data.prices);
            } catch (error) {
                console.error('Failed to fetch token history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className={styles.historyContainer}>
            <h2>Ethereum Price History (Last 30 Days)</h2>
            <ul>
                {history.map(([date, price], index) => (
                    <li key={index}>
                        Date: {new Date(date).toLocaleDateString()}, Price: ${price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TokenHistory;
