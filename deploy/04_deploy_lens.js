const main = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const compoundLens = await deploy("CompoundLens", {
    from: deployer,
    log: true,
  });

  console.log("CompoundLens", compoundLens.address);
};

module.exports = main;
module.exports.tags = ["CompoundLens"];
