import { useAccount } from '@web3modal/react'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { GeneraterPrompt } from '../../types'
import { Button, Textarea } from '../form'
import { IconWaiting } from '../icon'

type MintProps = {
  generating?: boolean
  onMintSubmit: SubmitHandler<GeneraterPrompt>
}

export function Mint(props: MintProps) {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<GeneraterPrompt>()
  const { isConnected } = useAccount()

  const prompt = watch('prompt')

  return (
    <form className="flex flex-col w-full gap-6 md:gap-8" onSubmit={handleSubmit(props.onMintSubmit)}>
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
        disabled={!prompt || !!errors.prompt || !isConnected || props.generating}
      >
        {props.generating && <IconWaiting className="animate-spin -ml-2 mr-2 w-6 text-white" />}
        {isConnected ? 'Mint Now' : 'No Wallet'}
      </Button>
    </form>
  )
}
