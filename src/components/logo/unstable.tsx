import { classNames } from '../../utils'

type LogoUnstableDiffusionProps = {
  className?: string
}

export function LogoUnstableDiffusion(props: LogoUnstableDiffusionProps) {
  return (
    <div
      className={classNames(
        'flex flex-col',
        'text-12 leading-13 text-white font-bold font-amatic uppercase',
        props.className
      )}
    >
      <span>Unstable</span>
      <span className="pl-4ch">Diffusion</span>
    </div>
  )
}
