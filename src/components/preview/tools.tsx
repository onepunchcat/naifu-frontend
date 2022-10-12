import React from 'react'

import { Button } from '../form'
import { IconHeart, IconRefresh } from '../icon'

type PreviewToolsProps = {
  generating?: boolean
  minting?: boolean
  onRegenerateClick: React.MouseEventHandler<HTMLButtonElement>
  onMintClick: React.MouseEventHandler<HTMLButtonElement>
}

export function PreviewTools(props: PreviewToolsProps) {
  return (
    <div className="absolute bottom-0 grid grid-cols-2 gap-5 p-5">
      <Button
        className="ml-auto"
        variant="secondary"
        title="Regenerate"
        type="button"
        circle
        disabled={props.generating}
        onClick={props.onRegenerateClick}
      >
        <IconRefresh className="rotate-90 w-6 md:w-10" />
      </Button>

      <Button
        className="mr-auto"
        variant="primary"
        title="Mint"
        type="button"
        circle
        disabled={props.minting}
        onClick={props.onMintClick}
      >
        <IconHeart className="w-6 md:w-10" />
      </Button>
    </div>
  )
}
