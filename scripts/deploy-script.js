// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Wallet = await hre.ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy();

  await wallet.deployed();

  console.log("\nWallet deployed to:", wallet.address);
}
// "key" : "0x8799bdb76150ae8363bce3c2c2c534dbe6a1d0800fd5448bde1ba301c46f1287",

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
