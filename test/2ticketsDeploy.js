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

    it("Checking behavior of addTicket() and getAllTickets() - single ticket", async function () {
      const { ticket, addr1 } = await loadFixture(deployTokenFixture);

      await ticket.addTicket("explenation", addr1.address, 10);

      const tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(1);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");
    });

    it("Checking behavior of addTicket() and getAllTickets() - multiple tickets", async function () {
      const { ticket, addr1, addr2 } = await loadFixture(deployTokenFixture);

      await ticket.addTicket("explenation", addr1.address, 10);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(1);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      await ticket.addTicket("explenation2", addr2.address, 20);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(2);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      expect(tickets[1].walletAddress).to.equal(addr2.address);
      expect(tickets[1].numberOfTokens).to.equal(20);
      expect(tickets[1].id).to.equal(1);
      expect(tickets[1].explanation).to.equal("explenation2");

      await ticket.addTicket("explenation3", addr1.address, 30);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(3);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      expect(tickets[1].walletAddress).to.equal(addr2.address);
      expect(tickets[1].numberOfTokens).to.equal(20);
      expect(tickets[1].id).to.equal(1);
      expect(tickets[1].explanation).to.equal("explenation2");

      expect(tickets[2].walletAddress).to.equal(addr1.address);
      expect(tickets[2].numberOfTokens).to.equal(30);
      expect(tickets[2].id).to.equal(2);
      expect(tickets[2].explanation).to.equal("explenation3");
    });

    it("Checking behavior of approve() - ticket approved", async function () {
      const { ticket, addr1, token } = await loadFixture(deployTokenFixture);

      await ticket.addTicket("explenation", addr1.address, 10);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(1);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      await ticket.approve(0, true, "You get some tokens");

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(0);

      addr1Tickets = await ticket.getAddressTickets(addr1.address);

      expect(addr1Tickets[0].walletAddress).to.equal(addr1.address);
      expect(addr1Tickets[0].numberOfTokens).to.equal(10);
      expect(addr1Tickets[0].id).to.equal(0);
      expect(addr1Tickets[0].explanation).to.equal("explenation");
      expect(addr1Tickets[0].explanationIfNot).to.equal("");
      expect(addr1Tickets[0].approved).to.equal(true);
      expect(addr1Tickets[0].checked).to.equal(true);

      addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(10);
    });

    it("Checking behavior of approve() - ticket declined", async function () {
      const { ticket, addr1, token } = await loadFixture(deployTokenFixture);

      await ticket.addTicket("explenation", addr1.address, 10);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(1);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      await ticket.approve(0, false, "I dont like you");

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(0);

      addr1Tickets = await ticket.getAddressTickets(addr1.address);

      expect(addr1Tickets[0].walletAddress).to.equal(addr1.address);
      expect(addr1Tickets[0].numberOfTokens).to.equal(10);
      expect(addr1Tickets[0].id).to.equal(0);
      expect(addr1Tickets[0].explanation).to.equal("explenation");
      expect(addr1Tickets[0].explanationIfNot).to.equal("I dont like you");
      expect(addr1Tickets[0].approved).to.equal(false);
      expect(addr1Tickets[0].checked).to.equal(true);

      addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(0);
    });

    it("Checking behavior of getAddressTickets()", async function () {
      const { ticket, addr1, addr2, token } = await loadFixture(deployTokenFixture);

      await ticket.addTicket("explenation", addr1.address, 10);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(1);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      await ticket.addTicket("explenation2", addr2.address, 20);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(2);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      expect(tickets[1].walletAddress).to.equal(addr2.address);
      expect(tickets[1].numberOfTokens).to.equal(20);
      expect(tickets[1].id).to.equal(1);
      expect(tickets[1].explanation).to.equal("explenation2");

      await ticket.addTicket("explenation3", addr1.address, 30);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(3);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      expect(tickets[1].walletAddress).to.equal(addr2.address);
      expect(tickets[1].numberOfTokens).to.equal(20);
      expect(tickets[1].id).to.equal(1);
      expect(tickets[1].explanation).to.equal("explenation2");

      expect(tickets[2].walletAddress).to.equal(addr1.address);
      expect(tickets[2].numberOfTokens).to.equal(30);
      expect(tickets[2].id).to.equal(2);
      expect(tickets[2].explanation).to.equal("explenation3");

      await ticket.approve(1, true, "You get some tokens");

      tickets = await ticket.getAllTickets();

      addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(20);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(2);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      expect(tickets[1].walletAddress).to.equal(addr1.address);
      expect(tickets[1].numberOfTokens).to.equal(30);
      expect(tickets[1].id).to.equal(2);
      expect(tickets[1].explanation).to.equal("explenation3");

      await ticket.approve(2, true, "You get some tokens2");

      tickets = await ticket.getAllTickets();

      addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(20);

      addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(30);

      tickets = await ticket.getAllTickets();

      expect(tickets.length).to.equal(1);

      expect(tickets[0].walletAddress).to.equal(addr1.address);
      expect(tickets[0].numberOfTokens).to.equal(10);
      expect(tickets[0].id).to.equal(0);
      expect(tickets[0].explanation).to.equal("explenation");

      myTickets = await ticket.getAddressTickets(addr1.address);
     
      expect(myTickets.length).to.equal(2);
    
      expect(myTickets[0].walletAddress).to.equal(addr1.address);
      expect(myTickets[0].numberOfTokens).to.equal(10);
      expect(myTickets[0].id).to.equal(0);
      expect(myTickets[0].explanation).to.equal("explenation");
      expect(myTickets[0].explanationIfNot).to.equal("");
      expect(myTickets[0].approved).to.equal(false);

      expect(myTickets[1].walletAddress).to.equal(addr1.address);
      expect(myTickets[1].numberOfTokens).to.equal(30);
      expect(myTickets[1].id).to.equal(2);
      expect(myTickets[1].explanation).to.equal("explenation3");
      expect(myTickets[1].explanationIfNot).to.equal("");
      expect(myTickets[1].approved).to.equal(true);

      myTickets2 = await ticket.getAddressTickets(addr2.address);

      expect(myTickets2.length).to.equal(1);
    
      expect(myTickets2[0].walletAddress).to.equal(addr2.address);
      expect(myTickets2[0].numberOfTokens).to.equal(20);
      expect(myTickets2[0].id).to.equal(1);
      expect(myTickets2[0].explanation).to.equal("explenation2");
      expect(myTickets2[0].explanationIfNot).to.equal("");
      expect(myTickets2[0].approved).to.equal(true);
    });
  });