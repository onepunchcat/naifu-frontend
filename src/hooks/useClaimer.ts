import { useAccount } from '@web3modal/react'
import { ContractReceipt } from 'ethers'
import React from 'react'

import { CLAIMER_ADDRESS } from '../constants'
import { ClaimerDataContext } from '../context'
import { ClaimerData, ClaimerDataTypes } from '../types'
import { useClaimerContract, useNaifuGenesisPassesContract, useNaifuTokenContract } from './useContract'

type ClaimerState = Record<ClaimerDataTypes, string>

const initialState: ClaimerState = { pass: '', token: '' }

export const useClaimerData = () => React.useContext(ClaimerDataContext)

type UseClaimer = {
  data: ClaimerData
  claim: () => Promise<ContractReceipt | undefined>
  refetch: () => Promise<void>
}

export function useClaimer(): UseClaimer {
  const state = React.useRef<ClaimerState>(initialState)

  const [data, updateData] = React.useContext(ClaimerDataContext)
  const { address: account } = useAccount()
  const claimerContract = useClaimerContract(CLAIMER_ADDRESS)
  const passContract = useNaifuGenesisPassesContract(state.current.pass)
  const tokenContract = useNaifuTokenContract(state.current.token)

  const fetchContractInfo = React.useCallback(async () => {
    if (!claimerContract) return updateData({ error: new Error('No claimer') })

    try {
      updateData({ isLoading: true })

      const pass = await claimerContract.pass()
      const token = await claimerContract.token()
      state.current.pass = pass
      state.current.token = token

      if (!account || !passContract || !tokenContract) return

      const passName = await passContract.name()
      const passSymbol = await passContract.symbol()
      const _passBalance = await passContract.balanceOf(account)
      const passBalance = _passBalance.toNumber()

      const tokenName = await tokenContract.name()
      const tokenSymbol = await tokenContract.symbol()
      const tokenDecimals = await tokenContract.decimals()
      const _tokenBalance = await tokenContract.balanceOf(account)
      const tokenBalance = _tokenBalance.toNumber()

      const _tokenPerPass = await claimerContract.w()
      const tokenPerPass = _tokenPerPass.toNumber()
      const claimed = await claimerContract.claimed(account)

      updateData({
        pass: { address: pass, name: passName, symbol: passSymbol, decimals: 0, balance: passBalance },
        token: { address: token, name: tokenName, symbol: tokenSymbol, decimals: tokenDecimals, balance: tokenBalance },
        tokenPerPass,
        claimed,
        error: undefined,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) updateData({ error })
      else updateData({ error: new Error('Unknown error') })
    } finally {
      updateData({ isLoading: false })
    }
  }, [account, claimerContract, passContract, tokenContract, updateData])

  const claim = React.useCallback(async () => {
    if (!claimerContract) return
    const tx = await claimerContract.claim()
    return await tx.wait()
  }, [claimerContract])

  const refetch = React.useCallback(async () => {
    await fetchContractInfo()
  }, [fetchContractInfo])

  React.useEffect(() => {
    fetchContractInfo()
  }, [fetchContractInfo])

  return { data, claim, refetch }
}
