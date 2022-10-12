export * from './tools'

import React from 'react'

import { classNames } from '../../utils'

type PreviewProps = {
  className?: string
  src?: string
  placeholder?: string
  width?: number
  height?: number
}

export function Preview(props: React.PropsWithChildren<PreviewProps>) {
  const { className, children, src } = props
  const { width = 512, height = 768, placeholder = 'Your generated artwork will appear here.' } = props

  const divRef = React.useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = React.useState({ width, height })

  React.useLayoutEffect(() => {
    function handleResize() {
      const pWidth = divRef.current?.parentElement?.offsetWidth
      if (!pWidth) return
      const hRatio = height / width
      if (pWidth > width) {
        setDimensions({ width: width, height: height })
      } else {
        setDimensions({ width: pWidth, height: pWidth * hRatio })
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [height, width])

  return (
    <div
      id="image-preview"
      className={classNames(
        'flex flex-row justify-center items-center rounded-lg',
        !src && 'box-border border-1 border-gray-600',
        children && 'relative',
        className
      )}
      style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      ref={divRef}
    >
      {!src && <p className="text-4 leading-5 text-gray-400">{placeholder}</p>}
      {src && <img className="object-cover w-full h-auto rounded-lg" src={src} alt="Generated artwork" />}
      {children}
    </div>
  )
}
