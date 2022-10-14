import type { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides, Signer, utils } from 'ethers'

import type { PromiseOrValue } from '../../../common'
import type { Claimer, ClaimerInterface } from '../../../contracts/Claimer.sol/Claimer'

const _abi = [
  {
    inputs: [],

    name: 'claim',

    outputs: [],

    stateMutability: 'nonpayable',

    type: 'function',
  },

  {
    inputs: [
      {
        internalType: 'address',

        name: '',

        type: 'address',
      },
    ],

    name: 'claimed',

    outputs: [
      {
        internalType: 'bool',

        name: '',

        type: 'bool',
      },
    ],

    stateMutability: 'view',

    type: 'function',
  },

  {
    inputs: [
      {
        internalType: 'address',

        name: '_token',

        type: 'address',
      },

      {
        internalType: 'address',

        name: '_pass',

        type: 'address',
      },
    ],

    name: 'init',

    outputs: [],

    stateMutability: 'nonpayable',

    type: 'function',
  },

  {
    inputs: [],

    name: 'pass',

    outputs: [
      {
        internalType: 'address',

        name: '',

        type: 'address',
      },
    ],

    stateMutability: 'view',

    type: 'function',
  },

  {
    inputs: [],

    name: 'token',

    outputs: [
      {
        internalType: 'address',

        name: '',

        type: 'address',
      },
    ],

    stateMutability: 'view',

    type: 'function',
  },

  {
    inputs: [],

    name: 'w',

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
]

const _bytecode =
  '0x608060405234801561001057600080fd5b50610609806100206000396000f3fe608060405234801561001057600080fd5b50600436106100725760003560e01c8063c884ef8311610050578063c884ef83146100c8578063f09a4016146100fb578063fc0c546a1461010e57600080fd5b8063205c9cc7146100775780634e71d92d14610093578063a7a1ed721461009d575b600080fd5b61008060025481565b6040519081526020015b60405180910390f35b61009b610121565b005b6001546100b0906001600160a01b031681565b6040516001600160a01b03909116815260200161008a565b6100eb6100d63660046104f6565b60036020526000908152604090205460ff1681565b604051901515815260200161008a565b61009b610109366004610518565b6102b4565b6000546100b0906001600160a01b031681565b3360009081526003602052604090205460ff16156101865760405162461bcd60e51b815260206004820152600f60248201527f416c726561647920436c61696d6564000000000000000000000000000000000060448201526064015b60405180910390fd5b33600081815260036020526040808220805460ff191660019081179091559154600254925491516370a0823160e01b8152600481018590526001600160a01b039182169463a9059cbb949093909216906370a0823190602401602060405180830381865afa1580156101fc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610220919061054b565b61022a9190610564565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af115801561028d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b1919061058f565b50565b6000546001600160a01b03161561030d5760405162461bcd60e51b815260206004820152601360248201527f416c726561647920496e697469616c697a656400000000000000000000000000604482015260640161017d565b600080546001600160a01b038481167fffffffffffffffffffffffff0000000000000000000000000000000000000000928316811790935560018054918516919092161790556040516370a0823160e01b81523360048201526370a0823190602401602060405180830381865afa15801561038c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103b0919061054b565b60028190556000546040517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101929092526001600160a01b0316906323b872dd906064016020604051808303816000875af1158015610424573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610448919061058f565b50600160009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561049c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c0919061054b565b600260008282546104d191906105b1565b90915550505050565b80356001600160a01b03811681146104f157600080fd5b919050565b60006020828403121561050857600080fd5b610511826104da565b9392505050565b6000806040838503121561052b57600080fd5b610534836104da565b9150610542602084016104da565b90509250929050565b60006020828403121561055d57600080fd5b5051919050565b808202811582820484141761058957634e487b7160e01b600052601160045260246000fd5b92915050565b6000602082840312156105a157600080fd5b8151801515811461051157600080fd5b6000826105ce57634e487b7160e01b600052601260045260246000fd5b50049056fea2646970667358221220216430d9522b9eaa81a380c77d69df464612777a3c0712445a3cacd23fc699ef64736f6c63430008110033'

type ClaimerConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (xs: ClaimerConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class Claimer__factory extends ContractFactory {
  constructor(...args: ClaimerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<Claimer> {
    return super.deploy(overrides || {}) as Promise<Claimer>
  }

  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }

  override attach(address: string): Claimer {
    return super.attach(address) as Claimer
  }

  override connect(signer: Signer): Claimer__factory {
    return super.connect(signer) as Claimer__factory
  }

  static readonly bytecode = _bytecode

  static readonly abi = _abi

  static createInterface(): ClaimerInterface {
    return new utils.Interface(_abi) as ClaimerInterface
  }

  static connect(address: string, signerOrProvider: Signer | Provider): Claimer {
    return new Contract(address, _abi, signerOrProvider) as Claimer
  }
}
