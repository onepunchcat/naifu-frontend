import { useAccount } from '@web3modal/react'
import React from 'react'
import { useNotifier } from 'react-headless-notifier'

import { Claim } from '../../components/claim'
import { Introduction } from '../../components/introduction'
import { BaseLayout } from '../../components/layout'
import { Mint } from '../../components/mint'
import { DangerNotification, InfoNotification, SuccessNotification } from '../../components/notification'
import { Preview } from '../../components/preview'
import { useClaimer, useGenerator, useMinter } from '../../hooks'
import { GeneratorPrompt } from '../../types'
import { isEthersError } from '../../utils'

type Notification = {
  message: string
}

function GeneratingNotification() {
  return <InfoNotification title="Generating" message="Your request has been submitted" />
}

function MintFailedNotification(props: Notification) {
  return <DangerNotification title="Mint failed" message={props.message} />
}

function ClaimFailedNotification(props: Notification) {
  return <DangerNotification title="Claim failed" message={props.message} />
}

export function Index() {
  const { isConnected } = useAccount()
  const { generate } = useGenerator()
  const { notify } = useNotifier()
  const { mint } = useMinter()
  const { data: claimerData, claim, refetch: refetchClaimerData } = useClaimer()

  const [image, setImage] = React.useState<string>()
  const [generating, setGenerating] = React.useState(false)
  const [claiming, setClaiming] = React.useState(false)

  const claimed = claimerData.claimed
  const passName = claimerData.pass.name
  const passBalance = claimerData.pass.balance
  const tokenSymbol = claimerData.token.symbol
  const noNFT = passBalance < 1 && !claimed
  const canClaim = !claimed && passBalance > 0

  const handleGenerateSubmit = React.useCallback(
    async (data: GeneratorPrompt) => {
      if (!isConnected || generating) return
      try {
        setGenerating(true)
        await mint()
        notify(<GeneratingNotification />)
        const res = await generate(data.prompt)
        setImage(res.image)
        await refetchClaimerData()
      } catch (error) {
        if (isEthersError(error)) notify(<MintFailedNotification message={error.reason || error.message} />)
        else if (error instanceof Error) notify(<MintFailedNotification message={error.message} />)
      } finally {
        setGenerating(false)
      }
    },
    [generate, generating, isConnected, mint, notify, refetchClaimerData]
  )

  const handleClaimClick = React.useCallback(async () => {
    if (!isConnected || claiming) return
    try {
      setClaiming(true)
      await claim()
      await refetchClaimerData()
      notify(<SuccessNotification title="Claim success" message="" />)
    } catch (error) {
      if (isEthersError(error)) notify(<ClaimFailedNotification message={error.reason || error.message} />)
      else if (error instanceof Error) notify(<ClaimFailedNotification message={error.message} />)
    } finally {
      setClaiming(false)
    }
  }, [claim, claiming, isConnected, notify, refetchClaimerData])

  return (
    <BaseLayout>
      <div className="flex flex-col lg:flex-row items-stretch gap-8 pb-16 xl:pb-0">
        <Introduction />
        <section id="image-generate" className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div className="flex flex-col xl:justify-center xl:items-center">
            <Preview src={image} />
          </div>
          <div className="flex flex-col-reverse md:flex-col w-full gap-6 md:gap-8">
            <Mint generating={generating} onMintSubmit={handleGenerateSubmit} />
            {isConnected && (
              <Claim
                claiming={claiming}
                claimDisabled={claimed || noNFT || claimerData.isLoading}
                onClaimClick={handleClaimClick}
              >
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
              </Claim>
            )}
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}
