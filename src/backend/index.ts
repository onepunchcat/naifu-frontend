import { $fetch } from 'ohmyfetch'

import { GeneraterParameters } from '../types'
import { getViteEnv } from '../utils'

function getMinterAPIBaseUrl(path: string): string {
  const baseUrl = getViteEnv('VITE_MINT_BASE_URL')
  return new URL(path, baseUrl).href
}

const minterFetch = $fetch.create({ baseURL: getMinterAPIBaseUrl('/') })

type RequestMintIdsResult = { id: string }

export async function requestMintIds(param: GeneraterParameters): Promise<RequestMintIdsResult> {
  const res = await minterFetch<RequestMintIdsResult>('/request', {
    method: 'POST',
    mode: 'cors',
    referrerPolicy: 'no-referrer',
    headers: { 'content-type': 'application/json' },
    body: { ...param },
  })
  return res
}
