const main = async function ({ deployments, getNamedAccounts }) {
  const { deploy, execute } = deployments;

  const { deployer, poster, admin } = await getNamedAccounts();

  const priceOracle = await deploy("SimplePriceOracle", {
    from: deployer,
    log: true,
  });

//   await execute(
//     "PriceOracle",
//     { from: deployer },
//     "_setPendingAnchorAdmin",
//     admin
//   );

  console.log("SimplePriceOracle", priceOracle.address);
};

module.exports = main;
module.exports.tags = ["PriceOracle"];
