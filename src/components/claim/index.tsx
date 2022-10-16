import React from 'react'

import { useClaimerData, useWatchERC20Asset } from '../../hooks'
import { Button } from '../form'
import { IconWaiting } from '../icon'

type ClaimProps = {
  claiming: boolean
  claimDisabled: boolean
  onClaimClick: React.MouseEventHandler<HTMLButtonElement>
}

export function Claim(props: React.PropsWithChildren<ClaimProps>) {
  const [claimerData] = useClaimerData()
  const { watchERC20Asset } = useWatchERC20Asset(claimerData.token.address)

  const handleAddTokenToWallet = React.useCallback(async () => {
    await watchERC20Asset()
  }, [watchERC20Asset])

  return (
    <section className="flex flex-col w-full gap-6 md:gap-8">
      <div className="pt-4 text-white font-semibold">Claim Token</div>
      <div className="flex flex-col gap-6">
        <ul className="pl-3 text-base text-white">{props.children}</ul>
        <div className="grid lg:grid-cols-2 gap-3 md:gap-5 lg:gap-8">
          <Button
            className="justify-center uppercase"
            type="button"
            disabled={props.claimDisabled || props.claiming}
            onClick={props.onClaimClick}
          >
            {props.claiming && <IconWaiting className="animate-spin -ml-2 mr-2 w-6 text-white" />}
            Claim {claimerData.token.symbol}
          </Button>
          <Button className="justify-center uppercase" type="button" onClick={handleAddTokenToWallet}>
            Add {claimerData.token.symbol} to wallet
          </Button>
        </div>
      </div>
    </section>
  )
}
