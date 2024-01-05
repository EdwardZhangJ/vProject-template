// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ]
})
