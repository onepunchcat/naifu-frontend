import { useAccount } from '@web3modal/react'
import React from 'react'

import { useWatchERC20Asset } from '../../hooks'
import { Button } from '../form'

export function Claim() {
  const { isConnected } = useAccount()
  const { data, isLoading, watchERC20Asset } = useWatchERC20Asset('0x935Bfe9AfaA2Be26049ea4EDE40A3A2243361F87') // TODO: No hardcode

  const handleAddTokenToWallet = React.useCallback(async () => {
    await watchERC20Asset()
  }, [watchERC20Asset])

  if (isConnected && !isLoading)
    return (
      <section className="flex flex-col w-full gap-6 md:gap-8">
        <div className="pt-4 text-white font-semibold">Claim Plural AI Token</div>
        <div className="grid lg:grid-cols-2 gap-3 md:gap-5 lg:gap-8">
          <Button className="justify-center uppercase" type="button">
            Claim {data?.symbol}
          </Button>
          <Button className="justify-center uppercase" type="button" onClick={handleAddTokenToWallet}>
            Add {data?.symbol} to wallet
          </Button>
        </div>
      </section>
    )

  return null
}
