const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Tickets", function () {
    async function deployTokenFixture() {
      const [addr1, addr2, addr3] = await ethers.getSigners();
  
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
      const market = await Market.deploy(token.address,ticket.address);
      await market.deployed();

      await ticket.setTokenAddress(token.address);
  
      return { addr1, addr2, ticket, dataBase, token, market };
    }
  
    it("Checking behavior of sendToken() while trying to send 0 tokens", async function () {
        const { token, ticket, addr1, addr2 } = await loadFixture(deployTokenFixture);
    
        await expect(ticket.sendToken(addr1.address, 0)).to.be.rejected;
    });


    it("Checking behavior of sendToken() Transfer owner -> address1", async function () {
        const { token, ticket, addr1 } = await loadFixture(deployTokenFixture);

        await ticket.sendToken(addr1.address, parseInt(50));

        const addr1Balance = await token.balanceOf(addr1.address);

        expect(addr1Balance).to.equal(50);
    });
  });