import React from 'react'
import { useNotifier } from 'react-headless-notifier'
import { useFormContext } from 'react-hook-form'

import { Button, Textarea } from '../../components/form'
import { IconWaiting } from '../../components/icon'
import { Introduction } from '../../components/introduction'
import { BaseLayout } from '../../components/layout'
import { InfoNotification } from '../../components/notification'
import { Preview } from '../../components/preview'
import { useGenerator } from '../../hooks'
import { GeneratorPrompt } from '../../types'

function GeneratingNotification() {
  return <InfoNotification title="Generating" message="Your request has been submitted" />
}

export function Index() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<GeneratorPrompt>()
  const { generate } = useGenerator()
  const { notify } = useNotifier()

  const prompt = watch('prompt')

  // const [previously, setPreviously] = React.useState<GenerateImageResult>()
  const [image, setImage] = React.useState<string>()
  const [generating, setGenerating] = React.useState(false)

  const handleGenerateSubmit = React.useCallback(
    async (data: GeneratorPrompt) => {
      if (generating) return
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
    [generate, generating, notify]
  )

  // const handleRegenerateClick = React.useCallback(async () => {
  //   if (!prompt || !previously || generating) return
  //   try {
  //     setGenerating(true)
  //     notify(<GeneratingNotification />)
  //     const res = await generate(prompt, previously)
  //     setPreviously(res)
  //     setImage(res.image)
  //   } finally {
  //     setGenerating(false)
  //   }
  // }, [generate, generating, notify, previously, prompt])

  // const handleMintClick = React.useCallback(async () => {
  //   if (!image) return
  //   console.log('Mint!')
  // }, [image])

  return (
    <BaseLayout>
      <div className="flex flex-col lg:flex-row items-stretch gap-8 pb-16 xl:pb-0">
        <Introduction />
        <section id="image-generate" className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div className="flex flex-col xl:justify-center xl:items-center">
            <Preview src={image}>
              {/* {image && (
                <PreviewTools
                  generating={generating}
                  onRegenerateClick={handleRegenerateClick}
                  onMintClick={handleMintClick}
                />
              )} */}
            </Preview>
          </div>
          <form className="flex flex-col w-full gap-6 md:gap-8" onSubmit={handleSubmit(handleGenerateSubmit)}>
            <label htmlFor="prompt-text">
              <div className="py-4 text-white font-semibold">Prompt</div>
              <Textarea
                id="prompt-text"
                className="md:min-h-60 [resize:none]"
                placeholder="Enter your prompt here."
                required
                {...register('prompt', { required: true })}
              />
            </label>
            <Button
              className="md:ml-auto md:w-55 justify-center uppercase"
              type="submit"
              disabled={!prompt || !!errors.prompt || generating}
            >
              {generating && <IconWaiting className="animate-spin -ml-2 mr-2 w-6 text-white" />}
              Mint Now
            </Button>
          </form>
        </section>
      </div>
    </BaseLayout>
  )
}
