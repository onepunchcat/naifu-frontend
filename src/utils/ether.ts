import { isAddress } from 'ethers/lib/utils'

import { stringSlice } from './string'

export function shortenIfAddress(address: string): string {
  if (isAddress(address)) return stringSlice(address, 6, 4)
  return ''
}
