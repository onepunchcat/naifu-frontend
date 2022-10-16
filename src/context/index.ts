import React from 'react'

import { ClaimerData } from '../types'

type ClaimerDataContextType = [ClaimerData, React.Dispatch<Partial<ClaimerData>>]

export const initialClaimerData: ClaimerData = {
  pass: { address: '', name: '', symbol: '', decimals: 18, balance: 0 },
  token: { address: '', name: '', symbol: '', decimals: 18, balance: 0 },
  tokenPerPass: 0,
  claimed: false,
  isLoading: true,
  error: undefined,
}

export const ClaimerDataContext = React.createContext<ClaimerDataContextType>([
  initialClaimerData,
  () => initialClaimerData,
])
