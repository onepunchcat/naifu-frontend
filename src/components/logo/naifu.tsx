import { classNames } from '../../utils'

type LogoNaifuProps = {
  className?: string
}

export function LogoNaifu(props: LogoNaifuProps) {
  return (
    <div className={classNames('flex flex-col text-18 text-white font-megrim', props.className)}>
      <span>NAIFU</span>
    </div>
  )
}
