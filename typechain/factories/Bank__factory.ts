/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Bank, BankInterface } from "../Bank";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "interest",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
    ],
    name: "depositReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "rewardPool",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_deployedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "s_deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_epoch",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_rewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_totalDeposits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002427380380620024278339818101604052810190620000379190620001af565b620000576200004b620000b560201b60201c565b620000bd60201b60201c565b60018081905550426003819055508060048190555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000262565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008151905062000192816200022e565b92915050565b600081519050620001a98162000248565b92915050565b60008060408385031215620001c357600080fd5b6000620001d38582860162000181565b9250506020620001e68582860162000198565b9150509250929050565b6000620001fd8262000204565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200023981620001f0565b81146200024557600080fd5b50565b620002538162000224565b81146200025f57600080fd5b50565b6121b580620002726000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806365156b311161008c578063afb41dac11610066578063afb41dac14610215578063b6b55f2514610233578063c885bc581461024f578063f2fde38b14610259576100ea565b806365156b31146101cf578063715018a6146101ed5780638da5cb5b146101f7576100ea565b80633ccfd60b116100c85780633ccfd60b14610159578063417964101461016357806352963c2b1461018157806359d987341461019f576100ea565b80631e2720ff146100ef57806327cf86711461010b5780632ba6e28214610129575b600080fd5b610109600480360381019061010491906116ae565b610275565b005b610113610449565b6040516101209190611bf6565b60405180910390f35b610143600480360381019061013e9190611700565b61044f565b6040516101509190611bf6565b60405180910390f35b610161610467565b005b61016b610a14565b6040516101789190611bf6565b60405180910390f35b610189610a1a565b6040516101969190611bf6565b60405180910390f35b6101b960048036038101906101b4919061165c565b610a20565b6040516101c69190611bf6565b60405180910390f35b6101d7610a38565b6040516101e49190611a19565b60405180910390f35b6101f5610a5e565b005b6101ff610ae6565b60405161020c919061199e565b60405180910390f35b61021d610b0f565b60405161022a9190611bf6565b60405180910390f35b61024d600480360381019061024891906116ae565b610b15565b005b610257610e2b565b005b610273600480360381019061026e919061165c565b6110a3565b005b61027d61119b565b73ffffffffffffffffffffffffffffffffffffffff1661029b610ae6565b73ffffffffffffffffffffffffffffffffffffffff16146102f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102e890611b36565b60405180910390fd5b6004546003546103019190611c6c565b4210610342576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033990611a56565b60405180910390fd5b610391333083600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166111a3909392919063ffffffff16565b80600560008282546103a39190611c6c565b9250508190555060648160146103b99190611cf3565b6103c39190611cc2565b60086000600160ff16815260200190815260200160002081905550606481601e6103ed9190611cf3565b6103f79190611cc2565b60086000600260ff1681526020019081526020016000208190555060648160326104219190611cf3565b61042b9190611cc2565b60086000600360ff1681526020019081526020016000208190555050565b60045481565b60086020528060005260406000206000915090505481565b60006001905060045460035461047d9190611c6c565b4210806104a4575060045460026104949190611cf3565b6003546104a19190611c6c565b42115b156104ae57600090505b80156104ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104e690611bd6565b60405180910390fd5b60026001541415610535576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052c90611bb6565b60405180910390fd5b60026001819055506000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054116105bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b690611a76565b60405180910390fd5b6000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000806000806004546003544261061a9190611d4d565b6106249190611cc2565b9050600281141561067557600654670de0b6b3a764000060086000600160ff168152602001908152602001600020548761065e9190611cf3565b6106689190611cf3565b6106729190611cc2565b93505b600381141561070957600654670de0b6b3a764000060086000600160ff16815260200190815260200160002054876106ad9190611cf3565b6106b79190611cf3565b6106c19190611cc2565b9350600654670de0b6b3a764000060086000600260ff16815260200190815260200160002054876106f29190611cf3565b6106fc9190611cf3565b6107069190611cc2565b92505b600481106107e157600654670de0b6b3a764000060086000600160ff16815260200190815260200160002054876107409190611cf3565b61074a9190611cf3565b6107549190611cc2565b9350600654670de0b6b3a764000060086000600260ff16815260200190815260200160002054876107859190611cf3565b61078f9190611cf3565b6107999190611cc2565b9250600654670de0b6b3a764000060086000600360ff16815260200190815260200160002054876107ca9190611cf3565b6107d49190611cf3565b6107de9190611cc2565b91505b60008284866107f09190611c6c565b6107fa9190611c6c565b9050670de0b6b3a7640000856108109190611cc2565b60086000600160ff16815260200190815260200160002060008282546108369190611d4d565b92505081905550670de0b6b3a7640000846108519190611cc2565b60086000600260ff16815260200190815260200160002060008282546108779190611d4d565b92505081905550670de0b6b3a7640000836108929190611cc2565b60086000600360ff16815260200190815260200160002060008282546108b89190611d4d565b92505081905550670de0b6b3a7640000816108d39190611cc2565b600560008282546108e49190611d4d565b9250508190555085600660008282546108fd9190611d4d565b925050819055506000600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506109b433670de0b6b3a7640000836109619190611cc2565b8861096c9190611c6c565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661122c9092919063ffffffff16565b3373ffffffffffffffffffffffffffffffffffffffff167fdf273cb619d95419a9cd0ec88123a0538c85064229baa6363788f743fff90deb87836040516109fc929190611c11565b60405180910390a25050505050506001808190555050565b60035481565b60065481565b60076020528060005260406000206000915090505481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610a6661119b565b73ffffffffffffffffffffffffffffffffffffffff16610a84610ae6565b73ffffffffffffffffffffffffffffffffffffffff1614610ada576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad190611b36565b60405180910390fd5b610ae460006112b2565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60055481565b600454600354610b259190611c6c565b4210610b66576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5d90611a56565b60405180910390fd5b8060008111610baa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba190611ab6565b60405180910390fd5b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610c07919061199e565b60206040518083038186803b158015610c1f57600080fd5b505afa158015610c33573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c5791906116d7565b9050610ca8333085600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166111a3909392919063ffffffff16565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610d05919061199e565b60206040518083038186803b158015610d1d57600080fd5b505afa158015610d31573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d5591906116d7565b905060008282610d659190611d4d565b905080600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610db69190611c6c565b925050819055508060066000828254610dcf9190611c6c565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c82604051610e1c9190611bf6565b60405180910390a25050505050565b610e3361119b565b73ffffffffffffffffffffffffffffffffffffffff16610e51610ae6565b73ffffffffffffffffffffffffffffffffffffffff1614610ea7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e9e90611b36565b60405180910390fd5b60048054610eb59190611cf3565b600354610ec29190611c6c565b4211610f03576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610efa90611af6565b60405180910390fd5b600060065414610f48576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3f90611b56565b60405180910390fd5b600060055411610f8d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8490611ad6565b60405180910390fd5b600060086000600360ff1681526020019081526020016000205460086000600260ff1681526020019081526020016000205460086000600160ff16815260200190815260200160002054610fe19190611c6c565b610feb9190611c6c565b9050600060086000600160ff16815260200190815260200160002081905550600060086000600260ff16815260200190815260200160002081905550600060086000600360ff1681526020019081526020016000208190555060006005819055506110a0611057610ae6565b82600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661122c9092919063ffffffff16565b50565b6110ab61119b565b73ffffffffffffffffffffffffffffffffffffffff166110c9610ae6565b73ffffffffffffffffffffffffffffffffffffffff161461111f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111690611b36565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561118f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118690611a96565b60405180910390fd5b611198816112b2565b50565b600033905090565b611226846323b872dd60e01b8585856040516024016111c4939291906119b9565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611376565b50505050565b6112ad8363a9059cbb60e01b848460405160240161124b9291906119f0565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050611376565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60006113d8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff1661143d9092919063ffffffff16565b905060008151111561143857808060200190518101906113f89190611685565b611437576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142e90611b96565b60405180910390fd5b5b505050565b606061144c8484600085611455565b90509392505050565b60608247101561149a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161149190611b16565b60405180910390fd5b6114a385611569565b6114e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114d990611b76565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161150b9190611987565b60006040518083038185875af1925050503d8060008114611548576040519150601f19603f3d011682016040523d82523d6000602084013e61154d565b606091505b509150915061155d82828661158c565b92505050949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6060831561159c578290506115ec565b6000835111156115af5782518084602001fd5b816040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115e39190611a34565b60405180910390fd5b9392505050565b60008135905061160281612123565b92915050565b6000815190506116178161213a565b92915050565b60008135905061162c81612151565b92915050565b60008151905061164181612151565b92915050565b60008135905061165681612168565b92915050565b60006020828403121561166e57600080fd5b600061167c848285016115f3565b91505092915050565b60006020828403121561169757600080fd5b60006116a584828501611608565b91505092915050565b6000602082840312156116c057600080fd5b60006116ce8482850161161d565b91505092915050565b6000602082840312156116e957600080fd5b60006116f784828501611632565b91505092915050565b60006020828403121561171257600080fd5b600061172084828501611647565b91505092915050565b61173281611d81565b82525050565b600061174382611c3a565b61174d8185611c50565b935061175d818560208601611dfa565b80840191505092915050565b61177281611dd6565b82525050565b600061178382611c45565b61178d8185611c5b565b935061179d818560208601611dfa565b6117a681611e8b565b840191505092915050565b60006117be601683611c5b565b91506117c982611e9c565b602082019050919050565b60006117e1601183611c5b565b91506117ec82611ec5565b602082019050919050565b6000611804602683611c5b565b915061180f82611eee565b604082019050919050565b6000611827602083611c5b565b915061183282611f3d565b602082019050919050565b600061184a601283611c5b565b915061185582611f66565b602082019050919050565b600061186d601a83611c5b565b915061187882611f8f565b602082019050919050565b6000611890602683611c5b565b915061189b82611fb8565b604082019050919050565b60006118b3602083611c5b565b91506118be82612007565b602082019050919050565b60006118d6601983611c5b565b91506118e182612030565b602082019050919050565b60006118f9601d83611c5b565b915061190482612059565b602082019050919050565b600061191c602a83611c5b565b915061192782612082565b604082019050919050565b600061193f601f83611c5b565b915061194a826120d1565b602082019050919050565b6000611962601683611c5b565b915061196d826120fa565b602082019050919050565b61198181611dbf565b82525050565b60006119938284611738565b915081905092915050565b60006020820190506119b36000830184611729565b92915050565b60006060820190506119ce6000830186611729565b6119db6020830185611729565b6119e86040830184611978565b949350505050565b6000604082019050611a056000830185611729565b611a126020830184611978565b9392505050565b6000602082019050611a2e6000830184611769565b92915050565b60006020820190508181036000830152611a4e8184611778565b905092915050565b60006020820190508181036000830152611a6f816117b1565b9050919050565b60006020820190508181036000830152611a8f816117d4565b9050919050565b60006020820190508181036000830152611aaf816117f7565b9050919050565b60006020820190508181036000830152611acf8161181a565b9050919050565b60006020820190508181036000830152611aef8161183d565b9050919050565b60006020820190508181036000830152611b0f81611860565b9050919050565b60006020820190508181036000830152611b2f81611883565b9050919050565b60006020820190508181036000830152611b4f816118a6565b9050919050565b60006020820190508181036000830152611b6f816118c9565b9050919050565b60006020820190508181036000830152611b8f816118ec565b9050919050565b60006020820190508181036000830152611baf8161190f565b9050919050565b60006020820190508181036000830152611bcf81611932565b9050919050565b60006020820190508181036000830152611bef81611955565b9050919050565b6000602082019050611c0b6000830184611978565b92915050565b6000604082019050611c266000830185611978565b611c336020830184611978565b9392505050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b6000611c7782611dbf565b9150611c8283611dbf565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611cb757611cb6611e2d565b5b828201905092915050565b6000611ccd82611dbf565b9150611cd883611dbf565b925082611ce857611ce7611e5c565b5b828204905092915050565b6000611cfe82611dbf565b9150611d0983611dbf565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611d4257611d41611e2d565b5b828202905092915050565b6000611d5882611dbf565b9150611d6383611dbf565b925082821015611d7657611d75611e2d565b5b828203905092915050565b6000611d8c82611d9f565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000611de182611de8565b9050919050565b6000611df382611d9f565b9050919050565b60005b83811015611e18578082015181840152602081019050611dfd565b83811115611e27576000848401525b50505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000601f19601f8301169050919050565b7f4465706f73697420706572696f64206578706972656400000000000000000000600082015250565b7f4e6f206465706f7369747320666f756e64000000000000000000000000000000600082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f416d6f756e74206d7573742062652067726561746572207468616e207a65726f600082015250565b7f5265776172647320706f6f6c20656d7074790000000000000000000000000000600082015250565b7f43616e2774207769746864726177207265776172647320796574000000000000600082015250565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f55736572732066756e6473207374696c6c20696e20706f6f6c00000000000000600082015250565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b7f5769746864726177616c20756e617661696c61626c6500000000000000000000600082015250565b61212c81611d81565b811461213757600080fd5b50565b61214381611d93565b811461214e57600080fd5b50565b61215a81611dbf565b811461216557600080fd5b50565b61217181611dc9565b811461217c57600080fd5b5056fea2646970667358221220b1bd765c84fa39aaf88988264765484364c615ebccfe1b15427b3da9ab78fd5764736f6c63430008040033";

export class Bank__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    token: string,
    epoch: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Bank> {
    return super.deploy(token, epoch, overrides || {}) as Promise<Bank>;
  }
  getDeployTransaction(
    token: string,
    epoch: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(token, epoch, overrides || {});
  }
  attach(address: string): Bank {
    return super.attach(address) as Bank;
  }
  connect(signer: Signer): Bank__factory {
    return super.connect(signer) as Bank__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BankInterface {
    return new utils.Interface(_abi) as BankInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Bank {
    return new Contract(address, _abi, signerOrProvider) as Bank;
  }
}
