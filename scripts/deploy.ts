import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Bank = await ethers.getContractFactory("Bank");

  const bankContract = await Bank.deploy(
    "0x98d9a611ad1b5761bdc1daac42c48e4d54cf5882", // Rinkeby ATRAC ERC20 Token
    "86400" // 24 hours
  );

  //verify: npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
  console.log("Bank Contract Address:", bankContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
