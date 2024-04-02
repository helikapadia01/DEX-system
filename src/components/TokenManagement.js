import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import styles from '../styles/tokenDashboard.module.css';

const ABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
    // decimals
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
    },]
const tokenContractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // Replace with your contract's address

function TokenDashboard() {
    const { walletAddress } = useParams();
    const [balance, setBalance] = useState('Loading...');

    useEffect(() => {
        const fetchBalance = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const tokenContract = new web3.eth.Contract(ABI, tokenContractAddress);
                try {
                    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
                    const decimals = await tokenContract.methods.decimals().call();
                    // Adjust the balance for the token's decimals
                    const formattedBalance = web3.utils.fromWei(balance, 'ether'); // Use 'ether' for standard 18 decimal tokens or adjust accordingly
                    setBalance(formattedBalance);
                } catch (error) {
                    console.error('Error fetching balance:', error);
                    setBalance('Error fetching balance');
                }
            } else {
                setBalance('MetaMask not detected');
            }
        };

        fetchBalance();
    }, [walletAddress]);

    return (
        <div className={styles.dashboardContainer}>
            <h2>Token Dashboard</h2>
            <p>Wallet Address: {walletAddress}</p>
            <p>Token Balance: {balance}</p>
        </div>
    );
}

export default TokenDashboard;
