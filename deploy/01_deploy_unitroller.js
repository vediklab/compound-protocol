const main = async function ({ deployments, getNamedAccounts, getChainId }) {
  const { deploy, execute } = deployments;
  const { deployer, admin } = await getNamedAccounts();

  console.log(await getNamedAccounts());

  console.log("getChainId", await getChainId());

  const _admin = admin;

  const unitroller = await deploy("Unitroller", {
    from: deployer,
    log: true,
  });

  await execute("Unitroller", { from: deployer }, "_setPendingAdmin", _admin);

  console.log("unitroller", unitroller.address);
};

module.exports = main;
module.exports.tags = ["Unitroller"];
