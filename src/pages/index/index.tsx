import { useAccount } from '@web3modal/react'
import React from 'react'
import { useNotifier } from 'react-headless-notifier'

import { Claim } from '../../components/claim'
import { Introduction } from '../../components/introduction'
import { BaseLayout } from '../../components/layout'
import { Mint } from '../../components/mint'
import { DangerNotification, InfoNotification, SuccessNotification } from '../../components/notification'
import { Preview } from '../../components/preview'
import { useClaimer, useMinter } from '../../hooks'
import { GeneraterPrompt } from '../../types'
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
  const { notify } = useNotifier()
  const { data: minterData, requestIds, mint } = useMinter()
  const { claim, refetch: refetchClaimerData } = useClaimer()

  const [image, setImage] = React.useState<string>()
  const [minting, setMinting] = React.useState(false)
  const [claiming, setClaiming] = React.useState(false)

  const handleGenerateSubmit = React.useCallback(
    async (data: GeneraterPrompt) => {
      if (!isConnected || minting) return
      try {
        setMinting(true)
        const reqIds = await requestIds(data.prompt)
        await mint(reqIds)
        notify(<GeneratingNotification />)
        await refetchClaimerData()
      } catch (error) {
        if (isEthersError(error)) notify(<MintFailedNotification message={error.reason || error.message} />)
        else if (error instanceof Error) notify(<MintFailedNotification message={error.message} />)
      } finally {
        setMinting(false)
      }
    },
    [isConnected, mint, minting, notify, refetchClaimerData, requestIds]
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
            <Mint
              minting={minting}
              mintDisabled={!minterData.started || minterData.ended}
              onMintSubmit={handleGenerateSubmit}
            />
            {isConnected && <Claim claiming={claiming} onClaimClick={handleClaimClick} />}
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}
