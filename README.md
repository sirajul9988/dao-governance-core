# DAO Governance Core 🗳️

![Solidity](https://img.shields.io/badge/Solidity-0.8.20-black) ![Governance](https://img.shields.io/badge/Module-OpenZeppelin-blue) ![Security](https://img.shields.io/badge/Security-Timelock-green)

## System Architecture

This repository implements a complete **Governor Bravo** style DAO. It allows token holders to vote on proposals, which are then executed on-chain by a `Timelock` contract after a safety delay.

### Components

1.  **Governance Token (`GovToken.sol`)**: An ERC20 extension that supports voting snapshots and delegation. You must delegate votes (even to yourself) to activate voting power.
2.  **TimeLock (`TimeLock.sol`)**: The owner of the system. It holds the funds/admin keys and only executes transactions that have passed a vote.
3.  **Governor (`GovernorContract.sol`)**: The logic engine. Handles:
    * `Propose`: Create a new vote.
    * `Vote`: Cast valid votes (For/Against/Abstain).
    * `Queue`: Send passed proposals to the Timelock.
    * `Execute`: Run the code.

### Workflow

1.  **Deploy**: Run `deploy.js` to setup Token, Timelock, and Governor.
2.  **Delegate**: Token holders delegate voting power to themselves.
3.  **Propose**: Create a proposal (e.g., "Send 100 ETH to Alice").
4.  **Vote**: Community votes.
5.  **Execute**: If passed, the Timelock executes the transfer.

## Configuration
* **Voting Delay**: 1 Block (Time between proposal and voting start).
* **Voting Period**: 1 Week (duration of voting).
* **Quorum**: 4% (Minimum votes required).

---
*Decentralized Control for Modern Protocols.*
