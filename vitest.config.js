import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setupTests.js'],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ['text', 'html']
    }
  }
})
