import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Button, Textarea } from '../../components/form'
import { IconHeart, IconRefresh } from '../../components/icon'
import { Introduction } from '../../components/introduction'
import { BaseLayout } from '../../components/layout'
import { Preview } from '../../components/preview'
import { GeneratorPrompt } from '../../types'

export function Index() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<GeneratorPrompt>()

  const prompt = watch('prompt')

  const [image, setImage] = React.useState<string>()

  const handleGenerateSubmit = React.useCallback(async (data: GeneratorPrompt) => {
    console.log(data)
    setImage('https://i.imgur.com/Gg4Vb5d.png')
  }, [])

  const handleRegenerateClick = React.useCallback(async () => {
    if (!prompt) return
    console.log('Regenerate!')
  }, [prompt])
  const handleMintClick = React.useCallback(async () => {
    if (!image) return
    console.log('Mint!')
  }, [image])

  return (
    <BaseLayout>
      <div className="flex flex-col lg:flex-row items-stretch gap-8 pb-16 xl:pb-0">
        <Introduction />
        <section id="image-generate" className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div className="flex flex-col xl:justify-center xl:items-center">
            <Preview src={image}>
              {image && (
                <div className="absolute bottom-0 grid grid-cols-2 gap-5 p-5">
                  <Button
                    className="ml-auto"
                    variant="secondary"
                    title="Regenerate"
                    type="button"
                    circle
                    onClick={handleRegenerateClick}
                  >
                    <IconRefresh className="rotate-90 w-6 md:w-10" />
                  </Button>
                  <Button
                    className="mr-auto"
                    variant="primary"
                    title="Mint"
                    type="button"
                    circle
                    onClick={handleMintClick}
                  >
                    <IconHeart className="w-6 md:w-10" />
                  </Button>
                </div>
              )}
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
              disabled={!prompt || !!errors.prompt}
            >
              Generate
            </Button>
          </form>
        </section>
      </div>
    </BaseLayout>
  )
}
