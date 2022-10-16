import { BigNumberish, ContractReceipt } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import React from 'react'

import { CLAIMER_ADDRESS } from '../constants'
import { useClaimerContract, useNaifuGenesisPassesContract } from './useContract'

type MinterDataTypes = 'pass'

type MinterState = Record<MinterDataTypes, string>

const initialState: MinterState = { pass: '' }

type UseMinter = {
  mint: (price?: BigNumberish) => Promise<ContractReceipt | undefined>
}

export function useMinter(): UseMinter {
  const state = React.useRef<MinterState>(initialState)
  const claimerContract = useClaimerContract(CLAIMER_ADDRESS)
  const passContract = useNaifuGenesisPassesContract(state.current.pass)

  const fetchContractInfo = React.useCallback(async () => {
    if (!claimerContract) return
    const pass = await claimerContract.pass()
    state.current.pass = pass
  }, [claimerContract])

  const mint = React.useCallback(
    async (price?: BigNumberish) => {
      if (!passContract) return
      if (!price) price = parseEther('0.01')
      const tx = await passContract['mint()']({ value: price })
      return await tx.wait()
    },
    [passContract]
  )

  React.useEffect(() => {
    fetchContractInfo()
  }, [fetchContractInfo])

  return { mint }
}
