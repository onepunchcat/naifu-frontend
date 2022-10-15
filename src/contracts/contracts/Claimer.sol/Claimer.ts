/* eslint-disable @typescript-eslint/ban-types */
import type { FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'

import type { OnEvent, PromiseOrValue, TypedEvent, TypedEventFilter, TypedListener } from '../../common'

export interface ClaimerInterface extends utils.Interface {
  functions: {
    'claim()': FunctionFragment
    'claimed(address)': FunctionFragment
    'init(address,address)': FunctionFragment
    'pass()': FunctionFragment
    'token()': FunctionFragment
    'w()': FunctionFragment
  }

  getFunction(nameOrSignatureOrTopic: 'claim' | 'claimed' | 'init' | 'pass' | 'token' | 'w'): FunctionFragment

  encodeFunctionData(functionFragment: 'claim', values?: undefined): string
  encodeFunctionData(functionFragment: 'claimed', values: [PromiseOrValue<string>]): string
  encodeFunctionData(functionFragment: 'init', values: [PromiseOrValue<string>, PromiseOrValue<string>]): string
  encodeFunctionData(functionFragment: 'pass', values?: undefined): string
  encodeFunctionData(functionFragment: 'token', values?: undefined): string
  encodeFunctionData(functionFragment: 'w', values?: undefined): string

  decodeFunctionResult(functionFragment: 'claim', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'claimed', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'init', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'pass', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'token', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'w', data: BytesLike): Result

  events: {}
}

export interface Claimer extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: ClaimerInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    claim(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>

    claimed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>

    init(
      _token: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    pass(overrides?: CallOverrides): Promise<[string]>

    token(overrides?: CallOverrides): Promise<[string]>

    w(overrides?: CallOverrides): Promise<[BigNumber]>
  }

  claim(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>

  claimed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>

  init(
    _token: PromiseOrValue<string>,
    _pass: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  pass(overrides?: CallOverrides): Promise<string>

  token(overrides?: CallOverrides): Promise<string>

  w(overrides?: CallOverrides): Promise<BigNumber>

  callStatic: {
    claim(overrides?: CallOverrides): Promise<void>

    claimed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>

    init(_token: PromiseOrValue<string>, _pass: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>

    pass(overrides?: CallOverrides): Promise<string>

    token(overrides?: CallOverrides): Promise<string>

    w(overrides?: CallOverrides): Promise<BigNumber>
  }

  filters: {}

  estimateGas: {
    claim(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>

    claimed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>

    init(
      _token: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    pass(overrides?: CallOverrides): Promise<BigNumber>

    token(overrides?: CallOverrides): Promise<BigNumber>

    w(overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    claim(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<PopulatedTransaction>

    claimed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>

    init(
      _token: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    pass(overrides?: CallOverrides): Promise<PopulatedTransaction>

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>

    w(overrides?: CallOverrides): Promise<PopulatedTransaction>
  }
}
