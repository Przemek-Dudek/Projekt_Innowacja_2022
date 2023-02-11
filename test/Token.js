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


  //Tu beda testy do ticketDeploy
  describe("Tickets", function () {
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
  
    it("Checking behavior of sendToken() executed by wrong adress", async function () {
        const { token, ticket, addr1, addr2 } = await loadFixture(deployTokenFixture);
    
        await expect(ticket.sendToken(addr1.address, 50)).to.be.rejected;
    });


    it("Checking behavior of sendToken()", async function () {
        const { token, ticket, addr1, addr2 } = await loadFixture(deployTokenFixture);
    

        //problem z niewlasciwym msgsenderem
        await ticket.connect(ticket.address).sendToken(addr1.address, 50);

        const ownerBalance = await token.balanceOf(ticket.address);
        const addr1Balance = await token.balanceOf(addr1.address);

        expect(ownerBalance).to.equal(await token.totalSupply() - 50);
        expect(addr1Balance).to.equal(50);
    });

    
  });

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
    
    //addProduct()

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

    //getProducts()

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

    //deleteProduct()
    
    it("Checking behavior of deleteProduct() with 0 products", async function() {
        const { market } = await loadFixture(deployTokenFixture);  
        await expect(market.deleteProduct()).to.be.rejected;
    });

    it("Checking behavior of deleteProduct() with no product name", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        
        await expect(market.deleteProduct("")).to.be.rejectedWith("Name cannot be empty");
    });

    it("Checking behavior of deleteProduct() with incorrect product name", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        
        await expect(market.deleteProduct("Item 2")).to.be.rejectedWith("No such product exists");

        await market.deleteProduct("Item 1");

        await expect(market.getProducts()).to.be.rejected;
    });

    it("Checking behavior of deleteProduct() - correct usage", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        await market.addProduct("Item 2", Number(12), "url2.jpg");
        await market.addProduct("Item 3", Number(36), "url3.jpg");

        products = await market.getProducts();

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
        
        await market.deleteProduct("Item 2");

        await expect(market.deleteProduct("product")).to.be.rejected;

        products = await market.getProducts();

        expect(products.length).to.equal(2);

        expect(products[0].name).to.equal("Item 1");
        expect(products[0].cost).to.equal(Number(4));
        expect(products[0].url).to.equal("url1.jpg");

        expect(products[1].name).to.equal("Item 3");
        expect(products[1].cost).to.equal(Number(36));
        expect(products[1].url).to.equal("url3.jpg");

        await market.deleteProduct("Item 1");

        await expect(market.deleteProduct("product")).to.be.rejected;

        products = await market.getProducts();

        expect(products.length).to.equal(1);

        expect(products[0].name).to.equal("Item 3");
        expect(products[0].cost).to.equal(Number(36));
        expect(products[0].url).to.equal("url3.jpg");

        await market.deleteProduct("Item 3");

        await expect(market.getProducts()).to.be.rejected;

        await expect(market.deleteProduct("product")).to.be.rejected;
    });

    //editProduct

    it("Checking behavior of editProduct() with 0 products", async function() {
        const { market } = await loadFixture(deployTokenFixture);  
        await expect(market.editProduct("name", 10, "newname")).to.be.rejected;
    });

    it("Checking behavior of editProduct() with no product name", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        
        await expect(market.editProduct("", 4, "newName")).to.be.rejectedWith("Name cannot be empty");
    });

    it("Checking behavior of editProduct() with negative cost", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        
        await expect(market.editProduct("Item 1", -4, "newName")).to.be.rejected;
    });

    it("Checking behavior of editProduct() with no new product name", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        
        products = await market.getProducts();

        expect(products[0].name).to.equal("Item 1");
        expect(products[0].cost).to.equal(Number(4));
        expect(products[0].url).to.equal("url1.jpg");

        await market.editProduct("Item 1", 12, "");

        products = await market.getProducts();

        expect(products[0].name).to.equal("Item 1");
        expect(products[0].cost).to.equal(Number(12));
        expect(products[0].url).to.equal("url1.jpg");
    });

    it("Checking behavior of editProduct() - full usage", async function() {
        const { market } = await loadFixture(deployTokenFixture);
        await market.addProduct("Item 1", Number(4), "url1.jpg");
        await market.addProduct("Item 2", Number(12), "url2.jpg");
        await market.addProduct("Item 3", Number(36), "url3.jpg");
        
        products = await market.getProducts();

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

        await market.editProduct("Item 1", 16, "newName 1");

        products = await market.getProducts();

        expect(products.length).to.equal(3);

        expect(products[0].name).to.equal("newName 1");
        expect(products[0].cost).to.equal(Number(16));
        expect(products[0].url).to.equal("url1.jpg");

        expect(products[1].name).to.equal("Item 2");
        expect(products[1].cost).to.equal(Number(12));
        expect(products[1].url).to.equal("url2.jpg");

        expect(products[2].name).to.equal("Item 3");
        expect(products[2].cost).to.equal(Number(36));
        expect(products[2].url).to.equal("url3.jpg");

        await market.editProduct("Item 2", 0, "newName 2");

        products = await market.getProducts();

        expect(products.length).to.equal(3);

        expect(products[0].name).to.equal("newName 1");
        expect(products[0].cost).to.equal(Number(16));
        expect(products[0].url).to.equal("url1.jpg");

        expect(products[1].name).to.equal("newName 2");
        expect(products[1].cost).to.equal(Number(0));
        expect(products[1].url).to.equal("url2.jpg");

        expect(products[2].name).to.equal("Item 3");
        expect(products[2].cost).to.equal(Number(36));
        expect(products[2].url).to.equal("url3.jpg");
    });

    //transaction tests here
  });