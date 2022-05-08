// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Tracelabs Bank smart contract task.
 */

contract XYZToken is ERC20 {
    constructor() ERC20("XYZ Token", "XYZ") {
        _mint(msg.sender, 10000000 * 10**18);
    }
}