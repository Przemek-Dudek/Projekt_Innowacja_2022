const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("ticketsDeploy", function () {
  async function deployTokenFixture() {
    const ticketsDeploy = await ethers.getContractFactory("ticketsDeploy");
    const [owner, addr1, addr2] = await ethers.getSigners(1000);

    const hardhatToken = await ticketsDeploy.deploy(1000);

    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, addr1, addr2 };
  }
});