import '@testing-library/jest-dom'

// Provide a simple global fetch mock placeholder for tests that don't override it.
if (!globalThis.fetch) {
  globalThis.fetch = () => Promise.resolve({ ok: true, json: () => ({}) })
}
