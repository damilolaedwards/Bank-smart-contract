//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title Tracelabs Bank smart contract task.
 */

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Bank is Ownable, ReentrancyGuard {
    error TransferFailed();

    //ERC20 staking and reward token
    IERC20 public s_token;

    //block timestamp during contract depolyment (t₀)
    uint256 public s_deployedAt;

    //time periods (T)
    uint256 public s_epoch;

    //staking rewards deposited by contract owner
    uint256 public s_rewards;

    //Total value locked in protocol
    uint256 public s_totalDeposits;

    //user deposits
    mapping(address => uint256) public s_deposits;

    //reward pool distribution (R1, R2, R3)
    mapping(uint8 => uint256) public rewardPool;

    /***********************/
    /* Modifiers Functions */
    /***********************/

    // From moment T to t₀+T
    modifier depositPeriod() {
        require(
            block.timestamp < s_deployedAt + s_epoch,
            "Deposit period expired"
        );
        _;
    }

    modifier moreThanZero(uint256 amount) {
        require(amount > 0, "Amount must be greater than zero");
        _;
    }

    // period => t₀ to T || > 2T
    modifier withdrawalPeriod() {
        bool locked = true;
        if (
            block.timestamp < s_deployedAt + s_epoch ||
            block.timestamp > s_deployedAt + (2 * s_epoch)
        ) {
            locked = false;
        }
        require(!locked, "Withdrawal unavailable");
        _;
    }

    /*************/
    /*   Events  */
    /*************/

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed sender, uint256 stake, uint256 interest);

    constructor(address token, uint256 epoch) {
        s_deployedAt = block.timestamp;
        s_epoch = epoch;
        s_token = IERC20(token);
    }

    /**
     * @notice Rewards added by the bank (contract owner)
     * @param rewards -> amount of token to be added as rewards
     */

    function depositReward(uint256 rewards) external onlyOwner depositPeriod {
        bool success = s_token.transferFrom(msg.sender, address(this), rewards);

        if (!success) {
            revert TransferFailed();
        }

        s_rewards += rewards;

        //R1 = 20% of R
        rewardPool[1] = (20 * rewards) / 100;

        //R2 = 30% of R
        rewardPool[2] = (30 * rewards) / 100;

        //R3 = 50% of R,
        rewardPool[3] = (50 * rewards) / 100;
    }

    /**
     * @notice Users deposit thier tokens
     * @param amount -> amount to be staked
     */

    function deposit(uint256 amount)
        external
        depositPeriod
        moreThanZero(amount)
    {
        bool success = s_token.transferFrom(msg.sender, address(this), amount);

        if (!success) {
            revert TransferFailed();
        }
        s_deposits[msg.sender] += amount;
        s_totalDeposits += amount;

        emit Deposit(msg.sender, amount);
    }

    /**
     * @notice User withdraw thier stakes and rewards
     */

    function withdraw() external withdrawalPeriod nonReentrant {
        require(s_deposits[msg.sender] > 0, "No deposits found");
        uint256 userDeposit = s_deposits[msg.sender];
        uint256 R1_yield = 0;
        uint256 R2_yield = 0;
        uint256 R3_yield = 0;
        uint256 T = (block.timestamp - s_deployedAt) / s_epoch;

        //period t₀+2T to t₀+3T
        if (T == 2) {
            R1_yield = (userDeposit * rewardPool[1] * 1e18) / s_totalDeposits;
        }

        //period t₀+3T to t₀+4T
        if (T == 3) {
            R1_yield = (userDeposit * rewardPool[1] * 1e18) / s_totalDeposits;
            R2_yield = (userDeposit * rewardPool[2] * 1e18) / s_totalDeposits;
        }
        //period 4T & above
        if (T >= 4) {
            R1_yield = (userDeposit * rewardPool[1] * 1e18) / s_totalDeposits;
            R2_yield = (userDeposit * rewardPool[2] * 1e18) / s_totalDeposits;
            R3_yield = (userDeposit * rewardPool[3] * 1e18) / s_totalDeposits;
        }

        uint256 userReward = R1_yield + R2_yield + R3_yield;

        rewardPool[1] -= R1_yield / 1e18;
        rewardPool[2] -= R2_yield / 1e18;
        rewardPool[3] -= R3_yield / 1e18;

        s_rewards -= userReward / 1e18;

        s_totalDeposits -= userDeposit;

        s_deposits[msg.sender] = 0;

        bool success = s_token.transfer(
            msg.sender,
            (userDeposit + (userReward / 1e18))
        );

        if (!success) {
            revert TransferFailed();
        }

        emit Withdrawal(msg.sender, userDeposit, userReward);
    }

    /**
     * @notice Remaining rewards withdrawn by the bank (contract owner)
     */

    function withdrawReward() external onlyOwner {
        require(
            block.timestamp > (s_deployedAt + (s_epoch * 4)),
            "Can't withdraw rewards yet"
        );
        require(s_totalDeposits == 0, "Users funds still in pool");
        require(s_rewards > 0, "Rewards pool empty");
        uint256 remainingRewards = rewardPool[1] +
            rewardPool[2] +
            rewardPool[3];

        rewardPool[1] = 0;
        rewardPool[2] = 0;
        rewardPool[3] = 0;
        s_rewards = 0;
        s_token.transfer(owner(), remainingRewards);
    }
}
