export type TokenData = {
  address: string
  name: string
  symbol: string
  decimals: number
  balance: number
}

export type ClaimerDataTypes = 'pass' | 'token'

export type ClaimerData = Record<ClaimerDataTypes, TokenData> & {
  tokenPerPass: number
  claimed: boolean
  isLoading: boolean
  error: Error | undefined
}
