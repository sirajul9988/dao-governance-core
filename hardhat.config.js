require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
        },
    },
  },
  networks: {
    sepolia: {
      url: process.env.RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
