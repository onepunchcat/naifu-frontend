import { getViteEnv } from '../utils'

export const MINTER_ADDRESS: string = getViteEnv('VITE_MINTER_ADDRESS')

export const CLAIMER_ADDRESS: string = getViteEnv('VITE_CLAIMER_ADDRESS', false)
