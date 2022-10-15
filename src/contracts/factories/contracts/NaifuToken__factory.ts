import type { Provider, TransactionRequest } from '@ethersproject/providers'
import { BigNumberish, Contract, ContractFactory, Overrides, Signer, utils } from 'ethers'

import type { PromiseOrValue } from '../../common'
import type { NaifuToken, NaifuTokenInterface } from '../../contracts/NaifuToken'

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'initialSupply',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060405162000cd138038062000cd1833981016040819052620000349162000197565b604051806040016040528060058152602001644e6169667560d81b815250604051806040016040528060038152602001624e414960e81b81525081600390816200007f919062000255565b5060046200008e828262000255565b505050620000a33382620000aa60201b60201c565b5062000349565b6001600160a01b038216620001055760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b806002600082825462000119919062000321565b90915550506001600160a01b038216600090815260208190526040812080548392906200014890849062000321565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b505050565b600060208284031215620001aa57600080fd5b5051919050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620001dc57607f821691505b602082108103620001fd57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200019257600081815260208120601f850160051c810160208610156200022c5750805b601f850160051c820191505b818110156200024d5782815560010162000238565b505050505050565b81516001600160401b03811115620002715762000271620001b1565b6200028981620002828454620001c7565b8462000203565b602080601f831160018114620002c15760008415620002a85750858301515b600019600386901b1c1916600185901b1785556200024d565b600085815260208120601f198616915b82811015620002f257888601518255948401946001909101908401620002d1565b5085821015620003115787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b808201808211156200034357634e487b7160e01b600052601160045260246000fd5b92915050565b61097880620003596000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d714610187578063a9059cbb1461019a578063dd62ed3e146101ad57600080fd5b8063395093511461014357806370a082311461015657806395d89b411461017f57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d66101e6565b6040516100e391906107c2565b60405180910390f35b6100ff6100fa36600461082c565b610278565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f366004610856565b610292565b604051601281526020016100e3565b6100ff61015136600461082c565b6102b6565b610113610164366004610892565b6001600160a01b031660009081526020819052604090205490565b6100d66102f5565b6100ff61019536600461082c565b610304565b6100ff6101a836600461082c565b6103b3565b6101136101bb3660046108b4565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101f5906108e7565b80601f0160208091040260200160405190810160405280929190818152602001828054610221906108e7565b801561026e5780601f106102435761010080835404028352916020019161026e565b820191906000526020600020905b81548152906001019060200180831161025157829003601f168201915b5050505050905090565b6000336102868185856103c1565b60019150505b92915050565b6000336102a0858285610519565b6102ab8585856105ab565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490919061028690829086906102f0908790610921565b6103c1565b6060600480546101f5906108e7565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156103a65760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6102ab82868684036103c1565b6000336102868185856105ab565b6001600160a01b03831661043c5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b0382166104b85760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146105a557818110156105985760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161039d565b6105a584848484036103c1565b50505050565b6001600160a01b0383166106275760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b0382166106a35760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b038316600090815260208190526040902054818110156107325760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161039d565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610769908490610921565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516107b591815260200190565b60405180910390a36105a5565b600060208083528351808285015260005b818110156107ef578581018301518582016040015282016107d3565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461082757600080fd5b919050565b6000806040838503121561083f57600080fd5b61084883610810565b946020939093013593505050565b60008060006060848603121561086b57600080fd5b61087484610810565b925061088260208501610810565b9150604084013590509250925092565b6000602082840312156108a457600080fd5b6108ad82610810565b9392505050565b600080604083850312156108c757600080fd5b6108d083610810565b91506108de60208401610810565b90509250929050565b600181811c908216806108fb57607f821691505b60208210810361091b57634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561028c57634e487b7160e01b600052601160045260246000fdfea2646970667358221220cfc31e43d2256b9d990791768b222c6b0d225641a204273efab46119d1fc719e64736f6c63430008110033'

type NaifuTokenConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: NaifuTokenConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1

export class NaifuToken__factory extends ContractFactory {
  constructor(...args: NaifuTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NaifuToken> {
    return super.deploy(initialSupply, overrides || {}) as Promise<NaifuToken>
  }
  override getDeployTransaction(
    initialSupply: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(initialSupply, overrides || {})
  }
  override attach(address: string): NaifuToken {
    return super.attach(address) as NaifuToken
  }
  override connect(signer: Signer): NaifuToken__factory {
    return super.connect(signer) as NaifuToken__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): NaifuTokenInterface {
    return new utils.Interface(_abi) as NaifuTokenInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): NaifuToken {
    return new Contract(address, _abi, signerOrProvider) as NaifuToken
  }
}
