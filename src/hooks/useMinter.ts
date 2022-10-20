import { BigNumber, ContractReceipt } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import React from 'react'

import { requestMintIds } from '../backend'
import { CLAIMER_ADDRESS, MINTER_ADDRESS } from '../constants'
import { isHistorical } from '../utils'
import { useClaimerContract, useNaifuGenesisPassesContract } from './useContract'
import { useGenerater } from './useGenerater'

type MinterDataTypes = 'pass'

type MinterState = Record<MinterDataTypes, string>

type MinterData = {
  started: boolean
  ended: boolean
}

const initialState: MinterState = { pass: '' }

const initialData: MinterData = { started: false, ended: false }

const dataReducer = (state: MinterData, action: Partial<MinterData>) => {
  console.debug('Update minter data', action)
  return { ...state, ...action }
}

type UseMinter = {
  data: MinterData
  requestIds: (prompt: string) => Promise<string[]>
  mint: (reqIds: string[], basePrice?: BigNumber) => Promise<ContractReceipt | undefined>
}

export function useMinter(): UseMinter {
  const state = React.useRef<MinterState>(initialState)
  const [data, updateData] = React.useReducer(dataReducer, initialData)
  const claimerContract = useClaimerContract(CLAIMER_ADDRESS)
  const passContract = useNaifuGenesisPassesContract(state.current.pass)
  const { generateParameters } = useGenerater()

  const mintBasePrice = parseEther('0.01')

  const fetchContractInfo = React.useCallback(async () => {
    if (CLAIMER_ADDRESS) {
      if (!claimerContract) return
      const pass = await claimerContract.pass()
      state.current.pass = pass
    } else state.current.pass = MINTER_ADDRESS
    console.debug('Fetch minter contract info', state.current.pass)
    if (!passContract) return
    const mintStart = await passContract.mintStart()
    const mintEnd = await passContract.mintEnd()
    const started = isHistorical(mintStart)
    const ended = isHistorical(mintEnd)
    updateData({ started, ended })
  }, [claimerContract, passContract])

  const requestIds = React.useCallback<UseMinter['requestIds']>(
    async (prompt) => {
      const param = await generateParameters(prompt)
      const { id: reqId } = await requestMintIds(param)
      return [reqId]
    },
    [generateParameters]
  )

  const mint = React.useCallback<UseMinter['mint']>(
    async (reqIds, basePrice = mintBasePrice) => {
      if (!passContract || !Array.isArray(reqIds)) return
      const amount = reqIds.length
      const price = basePrice.mul(amount)
      const tx = await passContract.mint(reqIds, { value: price })
      return await tx.wait()
    },
    [mintBasePrice, passContract]
  )

  React.useEffect(() => {
    fetchContractInfo()
  }, [fetchContractInfo])

  return { data, requestIds, mint }
}
