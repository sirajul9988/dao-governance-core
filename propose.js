const { ethers } = require("hardhat");

async function main() {
    const governorAddress = "0xYOUR_GOVERNOR_ADDRESS";
    const tokenAddress = "0xYOUR_TOKEN_ADDRESS";
    
    const governor = await ethers.getContractAt("GovernorContract", governorAddress);
    const token = await ethers.getContractAt("GovToken", tokenAddress);

    // Proposal: Mint 1000 tokens to the deployer (Self-serving proposal example)
    const proposalDescription = "Proposal #1: Mint 1000 Tokens for Treasury";
    const encodedFunction = token.interface.encodeFunctionData("mint", [process.env.MY_WALLET, 1000]);
    
    console.log("Creating Proposal...");
    const tx = await governor.propose(
        [tokenAddress], // Target
        [0], // Value
        [encodedFunction], // Calldata
        proposalDescription
    );

    const receipt = await tx.wait();
    console.log("Proposal Created! ID:", receipt.events[0].args.proposalId.toString());
}

main();
