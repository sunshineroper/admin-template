// uno.config.ts
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      logos: () => import('@iconify-json/logos/icons.json').then(i => i.default),
      gg: () => import('@iconify-json/gg/icons.json').then(i => i.default),
    }),
    // ...other presets
  ],
})
