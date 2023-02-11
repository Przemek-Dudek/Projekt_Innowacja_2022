const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Token Deployment", function () {
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


//transakcja nie dziala
/*describe("Transaction", function () {
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
    
      await expect(token.connect(ticket).transfer(addr1.address, 50)).to.changeTokenBalances(token, [ticket, addr1], [-50, 50]);
    
      await expect(token.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(token, [addr1, addr2], [-50, 50]);
    });
  });*/


  //Tu beda testy do ticketDeploy
  /*describe("Tickets", function () {
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
  
    
  });*/

  describe("Market" , function() {
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
    
    it("Checking behavior of addProduct() if price is negative", async function(){
      const { market } = await loadFixture(deployTokenFixture);
      await expect( market.addProduct("Item", Number(-1), "adres")).to.be.rejected;
    });

    it("Checking behavior of addProduct() if item name is an empty string", async function(){
      const { market } = await loadFixture(deployTokenFixture);
      await expect( market.addProduct("", Number(10), "adres")).to.be.rejected;
    });

    it("Checking behavior of addProduct() if item url is an empty string", async function(){
        const { market } = await loadFixture(deployTokenFixture);
        await expect( market.addProduct("Item", Number(10), "")).to.be.rejected;
    });

    it("Checking behavior of getProducts() with 0 products", async function(){
        const { market } = await loadFixture(deployTokenFixture);
        await expect(market.getProducts()).to.be.rejected;
      });

    it("Checking behavior of getProducts() after addProduct() being used correctly once", async function() {
      const { market } = await loadFixture(deployTokenFixture);  
      await market.addProduct("Item 1", Number(1), "pic.jpg");

      const products = await market.getProducts();

      expect(products.length).to.equal(1);
      expect(products[0].name).to.equal("Item 1");
      expect(products[0].cost).to.equal(Number(1));
      expect(products[0].url).to.equal("pic.jpg");
    });

    it("Checking behavior of getProducts() after addProduct() being used correctly twice", async function() {
      const { market } = await loadFixture(deployTokenFixture);  
      await market.addProduct("Item 1", Number(4), "url1.jpg");
      await market.addProduct("Item 2", Number(12), "url2.jpg");

      const products = await market.getProducts();

      expect(products.length).to.equal(2);

      expect(products[0].name).to.equal("Item 1");
      expect(products[0].cost).to.equal(Number(4));
      expect(products[0].url).to.equal("url1.jpg");

      expect(products[1].name).to.equal("Item 2");
      expect(products[1].cost).to.equal(Number(12));
      expect(products[1].url).to.equal("url2.jpg");
    });
    
    it("Checking behavior of deleteProduct() with 0 products", async function() {
        const { market } = await loadFixture(deployTokenFixture);  
        await expect(market.deleteProduct()).to.be.rejected;
    });

    it("Checking behavior of deleteProduct() with incorrect product name", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        
        await expect(market.deleteProduct("Item 2")).to.be.rejectedWith("No such product exists");
    });

    it("Checking behavior of deleteProduct() - last product on the list", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        await market.addProduct("Item 2", Number(12), "url2.jpg");
        await market.addProduct("Item 3", Number(36), "url3.jpg");

        const products = await market.getProducts();

        expect(products.length).to.equal(3);

        expect(products[0].name).to.equal("Item 1");
        expect(products[0].cost).to.equal(Number(4));
        expect(products[0].url).to.equal("url1.jpg");

        expect(products[1].name).to.equal("Item 2");
        expect(products[1].cost).to.equal(Number(12));
        expect(products[1].url).to.equal("url2.jpg");

        expect(products[2].name).to.equal("Item 3");
        expect(products[2].cost).to.equal(Number(36));
        expect(products[2].url).to.equal("url3.jpg");
        
        await market.deleteProduct("Item 3");

        const products = await market.getProducts();

        expect(products[0].name).to.equal("Item 1");
        expect(products[0].cost).to.equal(Number(4));
        expect(products[0].url).to.equal("url1.jpg");

        expect(products[1].name).to.equal("Item 2");
        expect(products[1].cost).to.equal(Number(12));
        expect(products[1].url).to.equal("url2.jpg");
    });

  });