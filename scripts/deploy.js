// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Ticket = await ethers.getContractFactory("ticketsDeploy");
  const ticket = await Ticket.deploy();
  await ticket.deployed();

  const DataBase = await ethers.getContractFactory("dataBase");
  const dataBase = await DataBase.deploy("admin","admin2","malpa@wp.pl");
  await dataBase.deployed();
  

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(ticket.address);
  await token.deployed();

  console.log("All contracts depolyed");

  ticket.setTokenAddress(token.address);

  console.log("Token address:", ticket.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(token,ticket,dataBase);
}

function saveFrontendFiles(token,ticket,dataBase) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "ticket-address.json"),
    JSON.stringify({ Ticket: ticket.address }, undefined, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "dataBase-address.json"),
    JSON.stringify({ DataBase: dataBase.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");
  const TicketArtifact = artifacts.readArtifactSync("ticketsDeploy");
  const DataArtifact = artifacts.readArtifactSync("dataBase");

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "ticketsDeploy.json"),
    JSON.stringify(TicketArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, "dataBase.json"),
    JSON.stringify(DataArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
