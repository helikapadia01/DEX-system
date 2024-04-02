import React, { useState, useEffect } from 'react';

function TokenInformation() {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Using Ethereum's token ID ("ethereum") as an example
        const url = `https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTokenData(data);
      } catch (error) {
        console.error("Failed to fetch token data:", error);
        setError('Failed to fetch token data');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <p>Loading token information...</p>;
  }

  if (error || !tokenData) {
    return <p>{error || 'No token data found.'}</p>;
  }

  // Safely accessing the properties with optional chaining
  return (
    <div>
      <h2>{tokenData.name} ({tokenData.symbol?.toUpperCase()})</h2>
      <p>Price: ${tokenData.market_data?.current_price?.usd}</p>
      <p>Total Supply: {tokenData.market_data?.total_supply}</p>
      <p>Market Cap: ${tokenData.market_data?.market_cap?.usd}</p>
    </div>
  );
}

export default TokenInformation;
