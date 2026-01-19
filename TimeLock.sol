// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    // minDelay: How long to wait before executing a passed proposal (e.g., 2 days)
    // proposers: List of addresses allowed to propose (usually the Governor contract)
    // executors: List of addresses allowed to execute (usually everyone)
    
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(minDelay, proposers, executors, msg.sender) {}
}
