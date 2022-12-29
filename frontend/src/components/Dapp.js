import React, { useEffect, useState } from 'react';

import { ethers } from "ethers";

// import TokenArtifact from "../contracts/Token.json";
// import contractAddress from "../contracts/contract-address.json";
// import ticketAddress from "../contracts/ticket-address.json";
// import TicketArtifact from "../contracts/ticketsDeploy.json";
// import dataBaseAddress from "../contracts/dataBase-address.json";
// import DataBaseArtifact from "../contracts/dataBase.json";

// import { NoWalletDetected } from "./NoWalletDetected";
// import { ConnectWallet } from "./ConnectWallet";
// import { Loading } from "./Loading";
// import { Transfer } from "./Transfer";
// import { TransactionErrorMessage } from "./TransactionErrorMessage";
// import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
// import { NoTokensMessage } from "./NoTokensMessage";

const HARDHAT_NETWORK_ID = '80001';

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

function Dapp(){
  
  
  async function connectWallet(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer = provider.getSigner()

    // const contractAddress = 'yourDeployedContractAddressGoesHere';
    // const ABI = "yourABIGoesHere"
    // const contract = new ethers.Contract(contractAddress, ABI, signer);  
    
  }
  return(
    <div>
      <button onClick={connectWallet}>
        connect
      </button>
    </div>

  ); 
  

}
 
export default Dapp;