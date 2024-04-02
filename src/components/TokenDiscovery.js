import React, { useState } from 'react';
import styles from '../styles/tokenDiscovery.module.css'; // Adjust this path to your CSS module

// Example token list
const tokens = [
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Cardano', symbol: 'ADA' },
    // Add more tokens as needed
];

function TokenDiscovery() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);

        if (!value.trim()) {
            setSearchResults([]);
            return;
        }

        const filteredTokens = tokens.filter(
            token => token.name.toLowerCase().includes(value) || token.symbol.toLowerCase().includes(value)
        );
        setSearchResults(filteredTokens);
    };

    return (
        <div className={styles.tokenDiscoveryContainer}>
            <h2>Token Discovery</h2>
            <input
                type="text"
                placeholder="Search by name or symbol..."
                value={query}
                onChange={handleSearch}
                className={styles.searchInput}
            />
            <div>
                {searchResults.length > 0 ? (
                    <ul className={styles.searchResults}>
                        {searchResults.map((token, index) => (
                            <li key={index} className={styles.searchResultItem}>
                                {token.name} ({token.symbol})
                            </li>
                        ))}
                    </ul>
                ) : (
                    query && <p>No tokens found.</p>
                )}
            </div>
        </div>
    );
}

export default TokenDiscovery;
