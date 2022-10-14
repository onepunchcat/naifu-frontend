import { useSigner, useToken } from '@web3modal/react'

type WatchERC20AssetOptions = {
  address: string
  symbol: string
  decimals: number
  image: string
}

type UseWatchERC20Asset = ReturnType<typeof useToken> & {
  watchERC20Asset(options?: Partial<WatchERC20AssetOptions>): Promise<void>
}

export function useWatchERC20Asset(address: string): UseWatchERC20Asset {
  const { data: signer } = useSigner()
  const token = useToken({ address })

  async function watchERC20Asset(options?: Partial<WatchERC20AssetOptions>) {
    if (!signer || token.isLoading || !token.data) return
    if (!signer.provider || !('send' in signer.provider)) return

    const provider = signer.provider
    // EIP-747 is not supported by most libraries https://github.com/ethers-io/ethers.js/discussions/3171
    // @ts-expect-error This is correct! https://www.jsonrpc.org/specification
    await provider.send('wallet_watchAsset', { type: 'ERC20', options: { ...token.data, ...options } })
  }

  return { ...token, watchERC20Asset }
}
