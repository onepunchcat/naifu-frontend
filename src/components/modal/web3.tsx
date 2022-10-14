import { chains, providers } from '@web3modal/ethereum'
import type { ConfigOptions } from '@web3modal/react'
import { Web3Modal as Web3ModalReact } from '@web3modal/react'

import { getViteEnv } from '../../utils'

const projectId = getViteEnv('VITE_WALLET_CONNECT_ID')

const config: ConfigOptions = {
  projectId,
  theme: 'dark',
  accentColor: 'default',
  ethereum: {
    appName: 'Plural AI',
    chains: [chains.goerli],
    providers: [providers.walletConnectProvider({ projectId })],
  },
}

export function Web3Modal() {
  return <Web3ModalReact config={config} />
}
