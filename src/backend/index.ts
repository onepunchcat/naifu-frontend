import { $fetch } from 'ohmyfetch'

import { GeneraterParameters } from '../types'
import { getViteEnv } from '../utils'

function getGeneraterAPIBaseUrl(path: string): string {
  const baseUrl = getViteEnv('VITE_GEN_BASE_URL')
  return new URL(path, baseUrl).href
}

const generaterFetch = $fetch.create({ baseURL: getGeneraterAPIBaseUrl('/') })

type GenerateImageResult = { output: string[] }

export async function generateImage(param: GeneraterParameters): Promise<string> {
  const res = await generaterFetch<GenerateImageResult>('/generate', {
    method: 'POST',
    mode: 'cors',
    referrerPolicy: 'no-referrer',
    headers: { accept: '*/*', 'content-type': 'application/json' },
    body: { ...param },
  })
  return res.output[0]
}

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
