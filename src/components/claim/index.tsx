import React from 'react'

import { useClaimerData, useWatchERC20Asset } from '../../hooks'
import { Button } from '../form'
import { IconWaiting } from '../icon'

type ClaimProps = {
  claiming?: boolean
  claimDisabled?: boolean
  onClaimClick: React.MouseEventHandler<HTMLButtonElement>
}

export function Claim(props: ClaimProps) {
  const [claimerData] = useClaimerData()
  const { watchERC20Asset } = useWatchERC20Asset(claimerData.token.address)

  const claimed = claimerData.claimed
  const passName = claimerData.pass.name
  const passBalance = claimerData.pass.balance
  const tokenSymbol = claimerData.token.symbol
  const noNFT = passBalance < 1 && !claimed
  const canClaim = !claimed && passBalance > 0
  const claimDisabled = claimed || noNFT || props.claimDisabled || props.claiming

  const handleAddTokenToWallet = React.useCallback(async () => {
    await watchERC20Asset()
  }, [watchERC20Asset])

  if (claimerData.error && claimerData.error.message === 'No claimer') return null

  return (
    <section className="flex flex-col w-full gap-6 md:gap-8">
      <div className="pt-4 text-white font-semibold">Claim Token</div>
      <div className="flex flex-col gap-6">
        {claimerData.isLoading && <p className="pl-3 text-base text-white">Loading...</p>}
        {!claimerData.isLoading && !claimerData.error && (
          <React.Fragment>
            <ul className="pl-3 text-base text-white">
              {noNFT && <li>You have {passBalance} NFT.</li>}
              {claimed && (
                <React.Fragment>
                  <li>You are already claimed.</li>
                  <li>
                    {passName} NFT: {passBalance}
                  </li>
                  <li>
                    {tokenSymbol} Balance: {claimerData.token.balance}
                  </li>
                </React.Fragment>
              )}
              {canClaim && (
                <React.Fragment>
                  <li>
                    {passName} NFT: {passBalance}
                  </li>
                  <li>
                    Estimated {tokenSymbol}: {passBalance * claimerData.tokenPerPass}
                  </li>
                </React.Fragment>
              )}
            </ul>
            <div className="grid lg:grid-cols-2 gap-3 md:gap-5 lg:gap-8">
              <Button
                className="justify-center uppercase"
                type="button"
                disabled={claimDisabled}
                onClick={props.onClaimClick}
              >
                {props.claiming && <IconWaiting className="animate-spin -ml-2 mr-2 w-6 text-white" />}
                Claim {claimerData.token.symbol}
              </Button>
              <Button className="justify-center uppercase" type="button" onClick={handleAddTokenToWallet}>
                Add {claimerData.token.symbol} to wallet
              </Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </section>
  )
}
