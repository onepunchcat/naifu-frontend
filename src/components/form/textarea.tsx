import React from 'react'

import { classNames } from '../../utils'

type TextareaProps = React.ComponentProps<'textarea'> & {
  className?: string
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
}

function TextareaComponent({ className, forwardedRef, ...props }: TextareaProps) {
  return (
    <textarea
      className={classNames(
        'flex flex-row box-border border-1 border-gray-600 rounded-lg',
        'w-full min-h-30 p-4 font-medium text-base text-zinc-50 bg-black',
        'placeholder:text-base placeholder:text-zinc hover:outline-none focus:outline-none',
        className
      )}
      ref={forwardedRef}
      {...props}
    />
  )
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Omit<TextareaProps, 'forwardedRef'>>(
  function renderLabeledInput(props, ref) {
    return <TextareaComponent {...props} forwardedRef={ref} />
  }
)
