import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from "../styles/homePage.module.css";

function HomePage() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    async function requestAccount() {
        // console.log('Requesting account...');
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            // console.log(accounts);
            if (accounts.length > 0) {
                navigate('/dashboard/' + accounts[0]); // Pass the connected wallet address as a route parameter
            }
        } catch (error) {
            console.log('Error connecting...');
        }
    }

    return (
        <div className={`${styles.app} ${theme}`}>
            <button onClick={toggleTheme} className={styles.themeToggleButton}>
                {theme === 'light' ?
                    <DarkModeIcon style={{ color: '#000' }} />
                    : <LightModeIcon style={{ color: '#FFF' }} />}
            </button>
            <div className={styles.content}>
                <h1 className={styles.heading}>Dex Wallet</h1>
                <button className={styles.connectButton} onClick={requestAccount}>
                    Connect Wallet
                </button>
            </div>
        </div>
    );
}

export default HomePage;
