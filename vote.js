const { ethers } = require("hardhat");

async function main() {
    const governorAddress = "0xYOUR_GOVERNOR_ADDRESS";
    const proposalId = "THE_PROPOSAL_ID_FROM_PREVIOUS_STEP";
    
    const governor = await ethers.getContractAt("GovernorContract", governorAddress);

    // 0 = Against, 1 = For, 2 = Abstain
    const voteWay = 1; 
    const reason = "I support this ecosystem growth.";

    console.log("Casting Vote...");
    const tx = await governor.castVoteWithReason(proposalId, voteWay, reason);
    await tx.wait();
    
    console.log("Vote Cast Successfully!");
}

main();
