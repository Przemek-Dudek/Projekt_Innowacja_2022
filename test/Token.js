const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Deployment", function () {
  async function deployTokenFixture() {
    const [addr1, addr2] = await ethers.getSigners();

    const Ticket = await ethers.getContractFactory("ticketsDeploy");
    const ticket = await Ticket.deploy();
    await ticket.deployed();

    const DataBase = await ethers.getContractFactory("dataBase");
    const dataBase = await DataBase.deploy("admin","admin2","malpa@wp.pl");
    await dataBase.deployed();
    
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy(ticket.address);
    await token.deployed();

    const Market = await ethers.getContractFactory("Market");
    const market = await Market.deploy();
    await market.deployed();

    return { addr1, addr2, ticket, dataBase, token, market };
  }

  it("Deploys contract and token with correct values", async function(){
    const { token } = await loadFixture(deployTokenFixture);
    expect(await token.symbol()).to.equal("$TTPSC");
    expect(await token.name()).to.equal("Transition Technologies");
  });

  it("Should set the right owner", async function(){
    const { token, ticket, owner } = await loadFixture(deployTokenFixture);
    expect(await token.owner()).to.equal(ticket.address);
  });

  it("Should assign the total supply of tokens to the ticket.address", async function () {
    const { token, ticket } = await loadFixture(deployTokenFixture);
    const ownerBalance = await token.balanceOf(ticket.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});

describe("Transaction", function () {
    async function deployTokenFixture() {
      const [addr1, addr2] = await ethers.getSigners();
  
      const Ticket = await ethers.getContractFactory("ticketsDeploy");
      const ticket = await Ticket.deploy();
      await ticket.deployed();

      const DataBase = await ethers.getContractFactory("dataBase");
      const dataBase = await DataBase.deploy("admin","admin2","malpa@wp.pl");
      await dataBase.deployed();
      
      const Token = await ethers.getContractFactory("Token");
      const token = await Token.deploy(ticket.address);
      await token.deployed();
  
      const Market = await ethers.getContractFactory("Market");
      const market = await Market.deploy();
      await market.deployed();
  
      return { addr1, addr2, ticket, dataBase, token, market };
    }
  
    it("Should transfer tokens between accounts", async function () {
      const { token, ticket, addr1, addr2 } = await loadFixture(deployTokenFixture);
    
      await expect(token.transfer(addr1.address, 50)).to.changeTokenBalances(token, [ticket, addr1], [-50, 50]);
    
      await expect(token.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(token, [addr1, addr2], [-50, 50]);
    });
  });