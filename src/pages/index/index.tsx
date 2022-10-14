import { useAccount } from '@web3modal/react'
import React from 'react'
import { useNotifier } from 'react-headless-notifier'

import { Claim } from '../../components/claim'
import { Introduction } from '../../components/introduction'
import { BaseLayout } from '../../components/layout'
import { Mint } from '../../components/mint'
import { InfoNotification } from '../../components/notification'
import { Preview } from '../../components/preview'
import { useGenerator } from '../../hooks'
import { GeneratorPrompt } from '../../types'

function GeneratingNotification() {
  return <InfoNotification title="Generating" message="Your request has been submitted" />
}

export function Index() {
  const { isConnected } = useAccount()
  const { generate } = useGenerator()
  const { notify } = useNotifier()

  const [image, setImage] = React.useState<string>()
  const [generating, setGenerating] = React.useState(false)

  const handleGenerateSubmit = React.useCallback(
    async (data: GeneratorPrompt) => {
      if (!isConnected || generating) return
      try {
        setGenerating(true)
        notify(<GeneratingNotification />)
        const res = await generate(data.prompt)
        // setPreviously(res)
        setImage(res.image)
      } finally {
        setGenerating(false)
      }
    },
    [generate, generating, isConnected, notify]
  )

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
            <Claim />
          </div>
        </section>
      </div>
    </BaseLayout>
  )
}
