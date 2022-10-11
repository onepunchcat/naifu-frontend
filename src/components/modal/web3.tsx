import type { ConfigOptions } from '@web3modal/react'
import { Web3Modal as Web3ModalReact } from '@web3modal/react'

import { getViteEnv } from '../../utils'

const config: ConfigOptions = {
  projectId: getViteEnv('VITE_WALLET_CONNECT_ID'),
  theme: 'dark',
  accentColor: 'default',
  ethereum: { appName: 'Unstable Diffusion' },
}

export function Web3Modal() {
  return <Web3ModalReact config={config} />
}
