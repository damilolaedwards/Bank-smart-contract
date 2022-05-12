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
  "0x608060405234801561001057600080fd5b5060405161151938038061151983398101604081905261002f916100b8565b61003833610068565b6001805542600355600455600280546001600160a01b0319166001600160a01b03929092169190911790556100f0565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100ca578182fd5b82516001600160a01b03811681146100e0578283fd5b6020939093015192949293505050565b61141a806100ff6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806365156b311161008c578063afb41dac11610066578063afb41dac146101be578063b6b55f25146101c7578063c885bc58146101da578063f2fde38b146101e257600080fd5b806365156b311461017a578063715018a6146101a55780638da5cb5b146101ad57600080fd5b80633ccfd60b116100c85780633ccfd60b14610140578063417964101461014857806352963c2b1461015157806359d987341461015a57600080fd5b80631e2720ff146100ef57806327cf8671146101045780632ba6e28214610120575b600080fd5b6101026100fd3660046111ff565b6101f5565b005b61010d60045481565b6040519081526020015b60405180910390f35b61010d61012e36600461122f565b60086020526000908152604090205481565b610102610497565b61010d60035481565b61010d60065481565b61010d6101683660046111b8565b60076020526000908152604090205481565b60025461018d906001600160a01b031681565b6040516001600160a01b039091168152602001610117565b61010261096c565b6000546001600160a01b031661018d565b61010d60055481565b6101026101d53660046111ff565b6109a2565b610102610be9565b6101026101f03660046111b8565b610dd5565b6000546001600160a01b031633146102285760405162461bcd60e51b815260040161021f9061129f565b60405180910390fd5b60045460035461023891906112d4565b421061027f5760405162461bcd60e51b815260206004820152601660248201527511195c1bdcda5d081c195c9a5bd908195e1c1a5c995960521b604482015260640161021f565b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b1580156102c357600080fd5b505afa1580156102d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102fb9190611217565b600254909150610316906001600160a01b0316333085610e6d565b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b15801561035a57600080fd5b505afa15801561036e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103929190611217565b905060006103a0838361132b565b905080600560008282546103b491906112d4565b90915550606490506103c782601461130c565b6103d191906112ec565b6001600090815260086020526000805160206113c583398151915280549091906103fc9084906112d4565b909155506064905061040f82601e61130c565b61041991906112ec565b6002600090815260086020526000805160206113a583398151915280549091906104449084906112d4565b909155506064905061045782603261130c565b61046191906112ec565b600360009081526008602052600080516020611385833981519152805490919061048c9084906112d4565b909155505050505050565b6004546003546001916104a9916112d4565b4210806104cf57506004546104bf90600261130c565b6003546104cc91906112d4565b42115b156104d8575060005b801561051f5760405162461bcd60e51b81526020600482015260166024820152755769746864726177616c20756e617661696c61626c6560501b604482015260640161021f565b600260015414156105725760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161021f565b6002600155336000908152600760205260409020546105c75760405162461bcd60e51b8152602060048201526011602482015270139bc819195c1bdcda5d1cc8199bdd5b99607a1b604482015260640161021f565b33600090815260076020526040812054600454600354919291829182918291906105f1904261132b565b6105fb91906112ec565b9050806002141561064c57600654600160005260086020526000805160206113c58339815191525461062d908761130c565b61063f90670de0b6b3a764000061130c565b61064991906112ec565b93505b80600314156106e257600654600160005260086020526000805160206113c58339815191525461067c908761130c565b61068e90670de0b6b3a764000061130c565b61069891906112ec565b600654600260005260086020526000805160206113a583398151915254919550906106c3908761130c565b6106d590670de0b6b3a764000061130c565b6106df91906112ec565b92505b600481106107be57600654600160005260086020526000805160206113c583398151915254610711908761130c565b61072390670de0b6b3a764000061130c565b61072d91906112ec565b600654600260005260086020526000805160206113a58339815191525491955090610758908761130c565b61076a90670de0b6b3a764000061130c565b61077491906112ec565b60065460036000526008602052600080516020611385833981519152549194509061079f908761130c565b6107b190670de0b6b3a764000061130c565b6107bb91906112ec565b91505b6000826107cb85876112d4565b6107d591906112d4565b90506107e9670de0b6b3a7640000866112ec565b6001600090815260086020526000805160206113c5833981519152805490919061081490849061132b565b9091555061082c9050670de0b6b3a7640000856112ec565b6002600090815260086020526000805160206113a5833981519152805490919061085790849061132b565b9091555061086f9050670de0b6b3a7640000846112ec565b600360009081526008602052600080516020611385833981519152805490919061089a90849061132b565b909155506108b29050670de0b6b3a7640000826112ec565b600560008282546108c3919061132b565b9250508190555085600660008282546108dc919061132b565b90915550503360008181526007602052604081205561092490610907670de0b6b3a7640000846112ec565b61091190896112d4565b6002546001600160a01b03169190610ede565b604080518781526020810183905233917fdf273cb619d95419a9cd0ec88123a0538c85064229baa6363788f743fff90deb910160405180910390a25050600180555050505050565b6000546001600160a01b031633146109965760405162461bcd60e51b815260040161021f9061129f565b6109a06000610f13565b565b6004546003546109b291906112d4565b42106109f95760405162461bcd60e51b815260206004820152601660248201527511195c1bdcda5d081c195c9a5bd908195e1c1a5c995960521b604482015260640161021f565b8060008111610a4a5760405162461bcd60e51b815260206004820181905260248201527f416d6f756e74206d7573742062652067726561746572207468616e207a65726f604482015260640161021f565b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610a8e57600080fd5b505afa158015610aa2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac69190611217565b600254909150610ae1906001600160a01b0316333086610e6d565b6002546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a082319060240160206040518083038186803b158015610b2557600080fd5b505afa158015610b39573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5d9190611217565b90506000610b6b838361132b565b33600090815260076020526040812080549293508392909190610b8f9084906112d4565b925050819055508060066000828254610ba891906112d4565b909155505060405181815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a25050505050565b6000546001600160a01b03163314610c135760405162461bcd60e51b815260040161021f9061129f565b60048054610c209161130c565b600354610c2d91906112d4565b4211610c7b5760405162461bcd60e51b815260206004820152601a60248201527f43616e2774207769746864726177207265776172647320796574000000000000604482015260640161021f565b60065415610ccb5760405162461bcd60e51b815260206004820152601960248201527f55736572732066756e6473207374696c6c20696e20706f6f6c00000000000000604482015260640161021f565b600060055411610d125760405162461bcd60e51b81526020600482015260126024820152715265776172647320706f6f6c20656d70747960701b604482015260640161021f565b6008602052600080516020611385833981519152546000805160206113a583398151915254600160009081526000805160206113c583398151915254909291610d5a916112d4565b610d6491906112d4565b600860205260006000805160206113c58339815191528190556000805160206113a5833981519152819055600381526000805160206113858339815191528190556005559050610dd2610dbf6000546001600160a01b031690565b6002546001600160a01b03169083610ede565b50565b6000546001600160a01b03163314610dff5760405162461bcd60e51b815260040161021f9061129f565b6001600160a01b038116610e645760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161021f565b610dd281610f13565b6040516001600160a01b0380851660248301528316604482015260648101829052610ed89085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610f63565b50505050565b6040516001600160a01b038316602482015260448101829052610f0e90849063a9059cbb60e01b90606401610ea1565b505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000610fb8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166110359092919063ffffffff16565b805190915015610f0e5780806020019051810190610fd691906111df565b610f0e5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161021f565b6060611044848460008561104e565b90505b9392505050565b6060824710156110af5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161021f565b6001600160a01b0385163b6111065760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161021f565b600080866001600160a01b031685876040516111229190611250565b60006040518083038185875af1925050503d806000811461115f576040519150601f19603f3d011682016040523d82523d6000602084013e611164565b606091505b509150915061117482828661117f565b979650505050505050565b6060831561118e575081611047565b82511561119e5782518084602001fd5b8160405162461bcd60e51b815260040161021f919061126c565b6000602082840312156111c9578081fd5b81356001600160a01b0381168114611047578182fd5b6000602082840312156111f0578081fd5b81518015158114611047578182fd5b600060208284031215611210578081fd5b5035919050565b600060208284031215611228578081fd5b5051919050565b600060208284031215611240578081fd5b813560ff81168114611047578182fd5b60008251611262818460208701611342565b9190910192915050565b602081526000825180602084015261128b816040850160208701611342565b601f01601f19169190910160400192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156112e7576112e761136e565b500190565b60008261130757634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156113265761132661136e565b500290565b60008282101561133d5761133d61136e565b500390565b60005b8381101561135d578181015183820152602001611345565b83811115610ed85750506000910152565b634e487b7160e01b600052601160045260246000fdfe625b35f5e76f098dd7c3a05b10e2e5e78a4a01228d60c3b143426cdf36d264556add646517a5b0f6793cd5891b7937d28a5b2981a5d88ebc7cd776088fea9041ad67d757c34507f157cacfa2e3153e9f260a2244f30428821be7be64587ac55fa26469706673582212203ee59bdd0ca4d0f171cd6a49f2b5095bb6bd93423625a4db05ed9b7d42c7612764736f6c63430008040033";

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
