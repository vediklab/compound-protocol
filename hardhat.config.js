const fs = require("fs");
const path = require("path");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// REQUIRED TO ENSURE METADATA IS SAVED IN DEPLOYMENTS (because solidity-coverage disable it otherwise)
const {
  TASK_COMPILE_GET_COMPILER_INPUT,
} = require("hardhat/builtin-tasks/task-names");
task(TASK_COMPILE_GET_COMPILER_INPUT).setAction(async (_, bre, runSuper) => {
  const input = await runSuper();
  input.settings.metadata.useLiteralContent = bre.network.name !== "coverage";
  return input;
});

function nodeUrl(network) {
  let infuraKey;
  try {
    infuraKey = process.env.INFURA;
  } catch (e) {
    infuraKey = "";
  }
  return `https://${network}.infura.io/v3/${infuraKey}`;
}

let MATIC_PRIVATE_KEY,
  KOVAN_PRIVATE_KEY,
  MOONBASE_PRIVATE_KEY,
  FUJICCHAIN_PRIVATE_KEY;

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  MATIC_PRIVATE_KEY = "provide matic account private key";
  KOVAN_PRIVATE_KEY = "provide Kovan account private key";
  MOONBASE_PRIVATE_KEY = "provide Moonbase(polkadot) account private key";
  FUJICCHAIN_PRIVATE_KEY = "provide FUJIChian(Avalanche) account private key";
} else {
  MATIC_PRIVATE_KEY = "provide matic account private key";
  KOVAN_PRIVATE_KEY = "provide Kovan account private key";
  MOONBASE_PRIVATE_KEY = "provide Moonbase(polkadot) account private key";
  FUJICCHAIN_PRIVATE_KEY = "provide FUJIChian(Avalanche) account private key";
}
const accounts = mnemonic
  ? {
      mnemonic,
    }
  : undefined;

const etherscanKey = process.env.ETHERSCANKEY || "";

if (typeof etherscanKey !== "string" || etherscanKey.length < 1)
  throw new Error("No Etherscan key found");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    kovan: {
      accounts,
      url: nodeUrl("kovan"),
      //   gas: 12000000,
      //   blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    // moonbase: {
    //     url: `https://rpc.testnet.moonbeam.network`,
    //     chainId: 1287,
    //     accounts: [MOONBASE_PRIVATE_KEY]
    // },
    // fujicchain: {
    //     url: `https://api.avax-test.network/ext/bc/C/rpc`,
    //     chainId: 43113,
    //     accounts: [FUJICCHAIN_PRIVATE_KEY]
    // },
    goerli: {
      accounts,
      url: nodeUrl("goerli"),
    },
    rinkeby: {
      accounts,
      url: nodeUrl("rinkeby"),
    },
    ropsten: {
      accounts,
      url: nodeUrl("ropsten"),
    },
    mainnet: {
      accounts,
      url: nodeUrl("mainnet"),
      gasPrice: 150000000000,
    },
    coverage: {
      url: "http://127.0.0.1:8555",
    },
    hardhat: {
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      timeout: 1800000,
    },
    matic: {
      accounts,
      url: "https://rpc-mumbai.maticvigil.com",
    },
  },
  etherscan: {
    apiKey: etherscanKey,
  },
  solidity: {
    version: "0.5.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    coverage: "./coverage",
    coverageJson: "./coverage.json",
    artifacts: "./artifacts",
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      4: "", // but for rinkeby it will be a specific address
      goerli: "", // it can also specify a specific netwotk name (specified in hardhat.config.js)
    },
    poster: {
      default: 1, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      1: "", // on the mainnet the feeCollector could be a multi sig
      4: "", // on rinkeby it could be another account
    },
    admin: {
      default: 2, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      1: "", // on the mainnet the feeCollector could be a multi sig
      4: "", // on rinkeby it could be another account
    },
  },
};
