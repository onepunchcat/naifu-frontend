import { $fetch } from 'ohmyfetch'

import { GeneraterParameters } from '../types'
import { getViteEnv } from '../utils'

function getGeneraterAPIBaseUrl(path: string): string {
  const baseUrl = getViteEnv('VITE_GEN_BASE_URL')
  return new URL(path, baseUrl).href
}

const generaterFetch = $fetch.create({ baseURL: getGeneraterAPIBaseUrl('/') })

type GenerateImage = {
  output: string[]
}

export async function generateImage(param: GeneraterParameters): Promise<string> {
  const res = await generaterFetch<GenerateImage>('/generate', {
    method: 'POST',
    mode: 'cors',
    referrerPolicy: 'no-referrer',
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
    },
    body: { ...param },
  })
  return res.output[0]
}
