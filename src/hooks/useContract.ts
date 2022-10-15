import { useSigner } from '@web3modal/react'
import React from 'react'

import {
  Claimer,
  Claimer__factory,
  NaifuGenesisPasses,
  NaifuGenesisPasses__factory,
  NaifuToken,
  NaifuToken__factory,
} from '../contracts'

export function useClaimerContract(address: string): Claimer | undefined {
  const { data: signer } = useSigner()

  const contract = React.useMemo(() => {
    if (!address || !signer) return
    return Claimer__factory.connect(address, signer)
  }, [address, signer])

  return contract
}

export function useNaifuGenesisPassesContract(address: string): NaifuGenesisPasses | undefined {
  const { data: signer } = useSigner()

  const contract = React.useMemo(() => {
    if (!address || !signer) return
    return NaifuGenesisPasses__factory.connect(address, signer)
  }, [address, signer])

  return contract
}

export function useNaifuTokenContract(address: string): NaifuToken | undefined {
  const { data: signer } = useSigner()

  const contract = React.useMemo(() => {
    if (!address || !signer) return
    return NaifuToken__factory.connect(address, signer)
  }, [address, signer])

  return contract
}
