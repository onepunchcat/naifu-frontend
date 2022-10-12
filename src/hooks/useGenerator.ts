import { generateImage } from '../backend'
import { GeneratorParameters, OrientType, Samplers } from '../types'

type OrientInfo = {
  width: number
  height: number
}

const orientMap: Record<OrientType, OrientInfo> = {
  landscape: { height: 512, width: 768 },
  portrait: { height: 768, width: 512 },
  square: { height: 640, width: 640 },
} as const

const lowQuality =
  'nsfw, lowres, text, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry'

const badAnatomy = 'bad anatomy, bad hands, error, missing fingers, extra digit, fewer digits'

export type GenerateImageResult = {
  image: string
  rawBase64: string
}

export function useGenerator() {
  async function generate(prompt: string, previously?: GenerateImageResult): Promise<GenerateImageResult> {
    const undesired = [lowQuality, badAnatomy]
    const seed = Math.round(new Date().getTime() / 1000)
    const orient = orientMap.portrait
    const parameters: Partial<GeneratorParameters> = {
      width: orient.width,
      height: orient.height,
      sampler: Samplers.KEulerAncestral,
      seed,
      n_samples: 1,
      uc: undesired.join(', '),
      ucPreset: 0,
    }

    let finalParameters: GeneratorParameters | null = null

    if (previously) {
      finalParameters = Object.assign(parameters, {
        image: previously.rawBase64,
        prompt,
        scale: 11,
        steps: 50,
      }) as GeneratorParameters
    } else {
      finalParameters = Object.assign(parameters, {
        prompt,
        scale: 12,
        steps: 28,
      }) as GeneratorParameters
    }

    const rawBase64 = await generateImage(finalParameters)
    return { image: `data:image/png;base64,${rawBase64}`, rawBase64 }
  }

  return { generate }
}
