require("@nomicfoundation/hardhat-toolbox");

async function main() {
  
  const [deployer] = await ethers.getSigners();

  const token = await ethers.deployContract("Doblier");
  await token.waitForDeployment();

  console.log(`Token Address`,await token.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
