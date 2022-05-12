# Bank smart contract task

[![Tests pass](https://github.com/damilolaedwards/tracelabs-challenge/actions/workflows/main.yml/badge.svg)](https://github.com/damilolaedwards/tracelabs-challenge/actions/workflows/main.yml)

## About

This repository contains the smart contracts source code for the Tracelabs bank smart contract task. The repository uses Hardhat as development enviroment for compilation, testing and deployment tasks.

## Development

First clone this repository and enter the directory.

Install dependencies:

```
$ npm install
```

## Testing

The project uses [Hardhat](https://hardhat.dev) and [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)

To run integration tests:

```sh
$ npx hardhat test
```

To run coverage:

```sh
$ npx hardhat coverage
```

## Rinkeby Ethereum Testnet Setup

First, we will need to set environment variables. We can do so by setting them in our `.env` file (create it if it's not there). You can also read more about [environment variables](https://www.twilio.com/blog/2017/01/how-to-set-environment-variables.html) from the linked twilio blog. You'll find a sample of what this file will look like in `.env.example`

`.env` example:

```
ETHERSCAN_API_KEY=JFINSOOAIANMJSIN
RINKEBY_URL='www.infura.io/asdfadsfafdadf'
PRIVATE_KEY='abcdef'
```

## Deployment

```sh
$ npx hardhat run scripts/deploy.ts --network rinkeby
```

To verify the auction contract run:

```sh
$ npx hardhat verify --network rinkeby --constructor-args arguments.js DEPLOYED_CONTRACT_ADDRESS
```

A verified version of the Bank contract on the Rinkeby network is available at address 0xF1d026559513b33468CE562A8A2497F0F443cfFC
https://rinkeby.etherscan.io/address/0xF1d026559513b33468CE562A8A2497F0F443cfFC#code
