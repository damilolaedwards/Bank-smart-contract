import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { XYZToken } from "../typechain";
import { Bank } from "../typechain";
import { BigNumber } from "ethers";

describe("Bank contract", async function () {
  const reward: BigNumber = BigNumber.from("1000000");
  let contractOwner: SignerWithAddress;
  let bankContract: Bank;
  let mockToken: XYZToken;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;

  beforeEach(async function () {
    [contractOwner, user1, user2, user3] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("XYZToken");
    mockToken = await Token.deploy();
    await mockToken.deployed();

    await mockToken.connect(contractOwner).transfer(user1.address, "1000000");
    await mockToken.connect(contractOwner).transfer(user2.address, "1000000");
    await mockToken.connect(contractOwner).transfer(user3.address, "1000000");

    const Bank = await ethers.getContractFactory("Bank");
    bankContract = await Bank.deploy(
      mockToken.address,
      "86400" // epoch (T) => 1 day
    );
    await bankContract.deployed();
  });

  it("sets contract constructor variables", async function () {
    const latestBlock = await ethers.provider.getBlock("latest");
    expect(await bankContract.s_deployedAt()).to.equal(latestBlock.timestamp);
    expect(await bankContract.s_epoch()).to.equal("86400");
    expect(await bankContract.s_token()).to.equal(mockToken.address);
  });

  it("allows owner deposit rewards", async function () {
    expect(await mockToken.balanceOf(bankContract.address)).to.equal("0");
    expect(await bankContract.s_rewards()).to.equal("0");
    expect(await bankContract.rewardPool(1)).to.equal("0");
    expect(await bankContract.rewardPool(2)).to.equal("0");
    expect(await bankContract.rewardPool(3)).to.equal("0");
    await mockToken
      .connect(contractOwner)
      .approve(bankContract.address, reward);
    await bankContract.connect(contractOwner).depositReward(reward);
    expect(await mockToken.balanceOf(bankContract.address)).to.equal(reward);
    expect(await bankContract.s_rewards()).to.equal(reward);
    expect(await bankContract.rewardPool(1)).to.equal(reward.mul(20).div(100));
    expect(await bankContract.rewardPool(2)).to.equal(reward.mul(30).div(100));
    expect(await bankContract.rewardPool(3)).to.equal(reward.mul(50).div(100));
  });

  it("reverts if non owner deposits reward", async function () {
    await mockToken.connect(user1).approve(bankContract.address, reward);
    await expect(
      bankContract.connect(user1).depositReward(reward)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("reverts if owner deposits rewards after deposit period", async function () {
    await mockToken
      .connect(contractOwner)
      .approve(bankContract.address, reward);
    await ethers.provider.send("evm_increaseTime", [86400]);
    await expect(
      bankContract.connect(contractOwner).depositReward(reward)
    ).to.be.revertedWith("Deposit period expired");
  });

  it("allows user deposit stake", async function () {
    expect(await bankContract.s_deposits(user1.address)).to.equal("0");
    expect(await bankContract.s_totalDeposits()).to.equal("0");
    await mockToken.connect(user1).approve(bankContract.address, "100000");
    await bankContract.connect(user1).deposit("100000");
    expect(await bankContract.s_deposits(user1.address)).to.equal("100000");
    expect(await bankContract.s_totalDeposits()).to.equal("100000");
  });

  it("reverts if user deposit after deposit period", async function () {
    await mockToken.connect(user1).approve(bankContract.address, "100000");
    await ethers.provider.send("evm_increaseTime", [86400]);
    await expect(
      bankContract.connect(user1).deposit("100000")
    ).to.be.revertedWith("Deposit period expired");
  });

  it("reverts if user deposit zero tokens", async function () {
    await mockToken.connect(user1).approve(bankContract.address, "0");
    await expect(bankContract.connect(user1).deposit("0")).to.be.revertedWith(
      "Amount must be greater than zero"
    );
  });

  it("allows user withdraw stake before deposit window closed", async function () {
    await mockToken.connect(user1).approve(bankContract.address, "100000");
    await bankContract.connect(user1).deposit("100000");
    const balance = await mockToken.balanceOf(user1.address);
    await bankContract.connect(user1).withdraw();
    expect(await mockToken.balanceOf(user1.address)).to.equal(
      balance.add("100000")
    );
  });

  it("reverts if user withdraw after deposit period & before withdrawal period", async function () {
    await mockToken.connect(user1).approve(bankContract.address, "100000");
    await bankContract.connect(user1).deposit("100000");
    await ethers.provider.send("evm_increaseTime", [86400]);
    await expect(bankContract.connect(user1).withdraw()).to.be.revertedWith(
      "Withdrawal unavailable"
    );
  });

  it("allows users collect proportional rewards", async function () {
    const user1Balance = await mockToken.balanceOf(user1.address);
    const user2Balance = await mockToken.balanceOf(user2.address);

    await mockToken
      .connect(contractOwner)
      .approve(bankContract.address, reward);
    await bankContract.connect(contractOwner).depositReward(reward);

    await mockToken.connect(user1).approve(bankContract.address, "100000");
    await bankContract.connect(user1).deposit("100000");

    await mockToken.connect(user2).approve(bankContract.address, "400000");
    await bankContract.connect(user2).deposit("400000");

    expect(await bankContract.s_totalDeposits()).to.equal("500000");

    await ethers.provider.send("evm_increaseTime", [172900]);

    expect(await bankContract.rewardPool(1)).to.equal("200000");

    await bankContract.connect(user1).withdraw();

    expect(await bankContract.s_deposits(user1.address)).to.equal("0");

    expect(await bankContract.s_totalDeposits()).to.equal("400000");

    expect(await bankContract.s_rewards()).to.equal(reward.sub("40000"));

    expect(await mockToken.balanceOf(user1.address)).to.equal(
      user1Balance.add("40000")
    );

    expect(await bankContract.rewardPool(1)).to.equal("160000");

    expect(await bankContract.rewardPool(2)).to.equal("300000");

    await ethers.provider.send("evm_increaseTime", [86400]);

    await bankContract.connect(user2).withdraw();

    expect(await bankContract.s_totalDeposits()).to.equal("0");

    expect(await mockToken.balanceOf(user2.address)).to.equal(
      user2Balance.add("460000")
    );

    expect(await bankContract.rewardPool(1)).to.equal("0");

    expect(await bankContract.rewardPool(2)).to.equal("0");

    const ownerBalance = await mockToken.balanceOf(contractOwner.address);

    await expect(
      bankContract.connect(contractOwner).withdrawReward()
    ).to.be.revertedWith("Can't withdraw rewards yet");

    await ethers.provider.send("evm_increaseTime", [86400]);

    await bankContract.connect(contractOwner).withdrawReward();

    expect(await mockToken.balanceOf(contractOwner.address)).to.equal(
      ownerBalance.add("500000")
    );

    expect(await bankContract.rewardPool(1)).to.equal(0);

    expect(await bankContract.rewardPool(2)).to.equal(0);

    expect(await bankContract.rewardPool(3)).to.equal(0);

    expect(await bankContract.s_rewards()).to.equal(0);
  });

  it("reverts in non owner tried to withdraw rewards", async function () {
    await mockToken
      .connect(contractOwner)
      .approve(bankContract.address, reward);
    await bankContract.connect(contractOwner).depositReward(reward);

    await ethers.provider.send("evm_increaseTime", [345700]);
    await expect(
      bankContract.connect(user1).withdrawReward()
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("it allows all rewards to be distributed", async function () {
    const user1Balance = await mockToken.balanceOf(user1.address);
    const user2Balance = await mockToken.balanceOf(user2.address);
    const user3Balance = await mockToken.balanceOf(user3.address);

    await mockToken
      .connect(contractOwner)
      .approve(bankContract.address, reward);
    await bankContract.connect(contractOwner).depositReward(reward);

    await mockToken.connect(user1).approve(bankContract.address, "100000");
    await bankContract.connect(user1).deposit("100000");

    await mockToken.connect(user2).approve(bankContract.address, "400000");
    await bankContract.connect(user2).deposit("400000");

    await mockToken.connect(user3).approve(bankContract.address, "500000");
    await bankContract.connect(user3).deposit("500000");

    await ethers.provider.send("evm_increaseTime", [172900]);

    await bankContract.connect(user1).withdraw();

    await ethers.provider.send("evm_increaseTime", [86400]);

    await bankContract.connect(user2).withdraw();

    await ethers.provider.send("evm_increaseTime", [86400]);

    await expect(
      bankContract.connect(contractOwner).withdrawReward()
    ).to.be.revertedWith("Users funds still in pool");

    await bankContract.connect(user3).withdraw();

    expect(await mockToken.balanceOf(user1.address)).to.equal(
      user1Balance.add("20000")
    );

    expect(await mockToken.balanceOf(user2.address)).to.equal(
      user2Balance.add("213333")
    );

    expect(await mockToken.balanceOf(user3.address)).to.equal(
      user3Balance.add("766667")
    );

    await expect(
      bankContract.connect(contractOwner).withdrawReward()
    ).to.be.revertedWith("Rewards pool empty");
  });
});
