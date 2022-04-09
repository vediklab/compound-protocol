const { ethers } = require("ethers");

const main = async function ({ deployments, getNamedAccounts }) {
  const { execute, get } = deployments;

  const { deployer } = await getNamedAccounts();

  const unitrollerAddress = (await get("Unitroller")).address;
  const comptrollerImplAddress = (await get("Comptroller_Implementation"))
    .address;
  await execute(
    "Unitroller",
    { from: deployer },
    "_setPendingImplementation",
    comptrollerImplAddress
  );
  await execute(
    "Comptroller_Implementation",
    { from: deployer },
    "_become",
    unitrollerAddress
  );

  const closeFactor = ethers.utils.parseEther("0.5");
  const liquidationIncentive = ethers.utils.parseEther("1.08");

  const priceOracleAddress = (await deployments.get("SimplePriceOracle"))
    .address;

  await execute(
    "Comptroller",
    { from: deployer },
    "_setCloseFactor",
    closeFactor
  );
  await execute(
    "Comptroller",
    { from: deployer },
    "_setLiquidationIncentive",
    liquidationIncentive
  );
  await execute(
    "Comptroller",
    { from: deployer },
    "_setPriceOracle",
    priceOracleAddress
  );
};

module.exports = main;
module.exports.tags = ["SetupComptroller"];
