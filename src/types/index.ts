export type GeneratorPrompt = {
  prompt: string
}

export type OrientType = 'landscape' | 'portrait' | 'square'

export enum Samplers {
  KEulerAncestral = 'k_euler_ancestral',
  KEuler = 'k_euler',
  KLms = 'k_lms',
  PLms = 'plms',
  DDim = 'ddim',
}

export type GeneratorParameters = {
  prompt: string
  width: number
  height: number
  scale: number
  sampler: Samplers
  steps: number
  seed: number
  n_samples: number
  ucPreset: number
  uc: string
}
