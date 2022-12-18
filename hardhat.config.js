require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

<<<<<<< HEAD


//Place for your private account key
const KEY = "";


=======
const KEY = "";
>>>>>>> d69cc09338a9dbf63401a3f14a8681be3a64550f

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
