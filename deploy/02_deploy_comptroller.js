const main = async function ({ deployments, getNamedAccounts, getChainId }) {
  const { deploy, get, save } = deployments;
  const { deployer } = await getNamedAccounts();

  const comptrollerImpl = await deploy("Comptroller_Implementation", {
    from: deployer,
    contract: "Comptroller",
    log: true,
  });

  const unitrollerAddress = (await get("Unitroller")).address;
  // update Comptroller ABI
  await save("Comptroller", {
    abi: comptrollerImpl.abi,
    address: unitrollerAddress,
  });

  console.log("comptroller", comptrollerImpl.address);
};

module.exports = main;
module.exports.tags = ["Comptroller"];
