import { $fetch } from 'ohmyfetch'

import { GeneratorParameters } from '../types'
import { getViteEnv } from '../utils'

function getGeneratorAPIBaseUrl(path: string): string {
  const baseUrl = getViteEnv('VITE_GEN_BASE_URL')

  return new URL(path, baseUrl).href
}

const generatorFetch = $fetch.create({ baseURL: getGeneratorAPIBaseUrl('/') })

type GenerateImage = {
  output: string[]
}

export async function generateImage(param: GeneratorParameters): Promise<string> {
  const res = await generatorFetch<GenerateImage>('/generate', {
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
