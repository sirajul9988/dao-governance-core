const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Token
    const GovToken = await ethers.getContractFactory("GovToken");
    const token = await GovToken.deploy();
    await token.deployed();
    console.log("GovToken deployed to:", token.address);

    // 2. Deploy Timelock (Min delay: 3600s, Proposers: [], Executors: [])
    const TimeLock = await ethers.getContractFactory("TimeLock");
    const timelock = await TimeLock.deploy(3600, [], []);
    await timelock.deployed();
    console.log("TimeLock deployed to:", timelock.address);

    // 3. Deploy Governor
    const Governor = await ethers.getContractFactory("GovernorContract");
    const governor = await Governor.deploy(token.address, timelock.address);
    await governor.deployed();
    console.log("Governor deployed to:", governor.address);

    // 4. Setup Roles (Crucial Step)
    const proposerRole = await timelock.PROPOSER_ROLE();
    const executorRole = await timelock.EXECUTOR_ROLE();
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

    // Governor can propose
    await timelock.grantRole(proposerRole, governor.address);
    // Anyone can execute (after delay)
    await timelock.grantRole(executorRole, ethers.constants.AddressZero);
    // Revoke admin from deployer (so only DAO controls Timelock)
    await timelock.revokeRole(adminRole, deployer.address);

    console.log("DAO Setup Complete!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
