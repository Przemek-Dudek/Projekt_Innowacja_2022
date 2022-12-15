require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

const KEY = "fb92d6f15a0fb19e499eb54a5f21e819baacdfd0669caf77f052878d7533d832";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    Mumbai: {
      chainId: 0x13881, // We set 1337 to make interacting with MetaMask simpler
      url : 'https://matic-mumbai.chainstacklabs.com',
      accounts: [KEY]
    }
  }
};
