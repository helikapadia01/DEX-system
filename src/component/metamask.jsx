import React, { useEffect, useState } from "react";
import Web3 from "web3";

const MetaMaskConnect = () => {
    const [web3,setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);

    useEffect(() => {
        const initializeWeb3 = async () => {
            try{
                //check if metmask is installed or not
                if(window.ethereum){
                    //Initialize web3
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);

                    //Request account access
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'});
                    const currentAccount = accounts[0];
                    setAccount(currentAccount);

                    //Subscribe to account changes
                    window.ethereum.on('accountsChanged', (newAccounts) => {
                        setAccount(newAccounts[0]);
                    });

                    //Subscribe to network changes
                    window.ethereum.on('chainChanged', (newChainId) => {
                        setNetwork(newChainId);
                    });
                } else{
                    alert('MetaMask is not installed');
                    console.log('MetaMask is not installed');
                }

            }catch(error){
                console.erroe('Error connecting to MetaMask', error);
            }
        };

        initializeWeb3();

        //clean up subcription on unmount
        return () => {
            if(window.etherum){
                window.ethereum.removeAllListeners('accountChanged');
                window.ethereum.removeAllListeners('chainChanged');
            }
        };
    }, []);

    return(
        <>
            <div>
                <h1>Meta Mask Connect</h1>
                {web3 && (
                    <div>
                        <p> Web3 Version: {web3.version}</p>
                        <p> MetaMask Connected Account: {account}</p>
                        <p>MetaMask Network ID: {network}</p>
                    </div>
                )}
            </div>
        </>
    )

}

export default MetaMaskConnect;