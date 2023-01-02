require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");



//Place for your private account key abcasd
const KEY = require('./secured.js');


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    //allowUnlimitedContractSize: true,
    Mumbai: {
      allowUnlimitedContractSize: true,
      chainId: 0x13881, // We set 1337 to make interacting with MetaMask simpler
      url : 'https://matic-mumbai.chainstacklabs.com',
      accounts: [KEY],
      gas: 21000000,
      gasPrice: 8000000000
    }
  }
};
