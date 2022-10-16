import { defineConfig, presetAttributify, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Dosis',
        // amatic: { name: 'Amatic SC', weights: [400, 700] },
        // barcode: { name: 'Libre Barcode 39 Text', weights: [400] },
        dosis: { name: 'Dosis', weights: [400, 500, 600, 700], italic: true },
        megrim: { name: 'Megrim', weights: [400] },
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
