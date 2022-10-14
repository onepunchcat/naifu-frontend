import { classNames } from '../../utils'

type LogoPluralAIProps = {
  className?: string
}

export function LogoPluralAI(props: LogoPluralAIProps) {
  return (
    <div className={classNames('flex flex-col text-18 text-white font-barcode', props.className)}>
      <span>Plural AI</span>
    </div>
  )
}
