import React from 'react'

import { classNames } from '../../utils'

type ButtonSizes = 'small' | 'medium'

type ButtonVariants = 'primary' | 'secondary'

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  className?: string
  circle?: boolean
  size?: ButtonSizes
  variant?: ButtonVariants
}

const sizes: Record<ButtonSizes, string> = {
  small: 'text-3.5 leading-5 font-normal',
  medium: 'text-6 leading-7.5 font-normal',
}

const calcPadding = (circle: boolean): Record<ButtonSizes, string> => {
  return {
    small: circle ? 'p-4' : 'px-4 py-2',
    medium: circle ? 'p-4' : 'px-8 py-4',
  }
}

const variants: Record<ButtonVariants, string> = {
  primary: '!bg-orange-600 text-white hover:!bg-orange-500 active:!bg-orange-700',
  secondary: '!bg-sky-600 text-white hover:!bg-sky-500 active:!bg-sky-700',
}

export function Button(props: ButtonProps) {
  const { className, children, circle = false, variant = 'primary', size = 'medium', ...others } = props
  const paddings = calcPadding(circle)

  return (
    <button
      className={classNames(
        'box-border flex flex-row items-center drop-shadow rounded-full',
        'disabled:!bg-gray disabled:text-zinc-600 disabled:hover:!bg-gray disabled:hover:text-zinc-600 disabled:cursor-not-allowed',
        variants[variant],
        !circle && sizes[size],
        paddings[size],
        className
      )}
      {...others}
    >
      {children}
    </button>
  )
}
