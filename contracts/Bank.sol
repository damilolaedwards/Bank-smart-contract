//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/**
 * @title Bank smart contract task.
 */

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";


contract Bank is Ownable, ReentrancyGuard {

    using SafeERC20 for IERC20;


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
        uint256 prevBalance = s_token.balanceOf(address(this));
        s_token.safeTransferFrom(msg.sender, address(this), rewards);
        uint256 currentBalance = s_token.balanceOf(address(this));

        uint256 recievedRewards = currentBalance - prevBalance;

        s_rewards += recievedRewards;

        //R1 = 20% of R
        rewardPool[1] += (20 * recievedRewards) / 100;

        //R2 = 30% of R
        rewardPool[2] += (30 * recievedRewards) / 100;

        //R3 = 50% of R,
        rewardPool[3] += (50 * recievedRewards) / 100;
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
        uint256 prevBalance = s_token.balanceOf(address(this));
        s_token.safeTransferFrom(msg.sender, address(this), amount);
        uint256 currentBalance = s_token.balanceOf(address(this));

        uint256 recievedTokens = currentBalance - prevBalance;
      
        s_deposits[msg.sender] += recievedTokens;
        s_totalDeposits += recievedTokens;

        emit Deposit(msg.sender, recievedTokens);
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

       s_token.safeTransfer(
            msg.sender,
            (userDeposit + (userReward / 1e18))
        );

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
       s_token.safeTransfer(owner(), remainingRewards);
    }
}
