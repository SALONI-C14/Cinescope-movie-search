# CineScope — Week 5: Testing, Debugging, and Code Quality Assurance

Version: 1.0.0 — Week 5 report

## 1. Project Title

CineScope — a small React + Vite movie search application that queries the OMDb API and displays results as movie cards with detailed views.

## 2. Week 5 Task Overview

This week's work focused on establishing a robust testing, debugging, and code quality workflow for CineScope. Activities included:

- Adding unit and integration tests with Vitest and React Testing Library.
- Mocking API requests to avoid external network dependency during tests.
- Debugging React test warnings (notably `act(...)` warnings) and fixing them with recommended RTL patterns.
- Running ESLint and addressing lint issues so tests and linting coexist cleanly.
- Validating production build with Vite and capturing bundle metrics.

## 3. Project Overview

- Tech stack: ReactJS, Vite, JavaScript, CSS.
- External API: OMDb API (consumed via `src/services/movieApi.js`).
- Core UI components are in `src/components/` and include `SearchBar`, `MovieCard`, `MovieGrid`, `MovieDetails`, `Loading`, `ErrorMessage`, and `EmptyState`.

## 4. Week 5 Objectives

- Provide test coverage for components and services.
- Ensure tests are deterministic by mocking network calls.
- Remove React testing warnings and follow RTL best practices.
- Keep the application unchanged while improving testability.
- Verify linting and production build success.

## 5. Technologies and Tools Used

- React 18
- Vite
- JavaScript (ES2021)
- CSS
- OMDb API
- Vitest (test runner)
- React Testing Library (RTL)
- @testing-library/jest-dom
- @testing-library/user-event
- ESLint

## 6. Project Structure (relevant files)

- `index.html`, `vite.config.js`, `package.json`
- `src/main.jsx`, `src/App.jsx`
- `src/components/`
  - `SearchBar/SearchBar.jsx`
  - `MovieCard/MovieCard.jsx`
  - `MovieGrid/MovieGrid.jsx`
  - `EmptyState/EmptyState.jsx`
  - `ErrorMessage/ErrorMessage.jsx`
- `src/services/movieApi.js`
- `src/test/setupTests.js` (Vitest setup)
- `vitest.config.js`
- Tests:
  - `src/services/movieApi.test.js`
  - `src/components/.../*.test.jsx`
  - `src/__tests__/search.integration.test.jsx`

## 7. Testing Strategy

- Unit tests for pure functions and small components.
- Component tests for rendering and user interactions.
- Service tests for API-related logic (mocked network responses).
- Integration test to verify end-to-end search flow (input → API → results).
- Keep tests focused on user-visible behavior rather than implementation details.

## 8. Testing Framework Setup

- `vitest.config.js` configures a `jsdom` environment and sets up `src/test/setupTests.js` which imports `@testing-library/jest-dom`.
- Vitest globals are enabled so tests can use `vi`, `describe`, `it`, and `expect` where appropriate (note: individual test files also import the specific helpers to satisfy ESLint).

Example `vitest.config.js` excerpt:

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setupTests.js'],
    globals: true,
    coverage: { provider: 'c8', reporter: ['text', 'html'] }
  }
})
```

## 9. Unit Testing

- Service unit tests mock `fetch` and validate mapping and error handling.
- Component unit tests validate rendering, accessibility attributes, and user interactions.

Example test for `movieApi.searchMovies` (unit test snippet):

```js
import { describe, it, expect, vi } from 'vitest'
import { searchMovies } from '../../services/movieApi'

describe('searchMovies', () => {
  it('returns normalized results on success', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ Response: 'True', Search: [{ imdbID: 't1', Title: 'T', Year: '2020', Type: 'movie', Poster: 'N/A' }] })
    }))

    const res = await searchMovies('T')
    expect(res[0].imdbID).toBe('t1')
  })
})
```

## 10. Component Testing

- `SearchBar` tests ensure input accepts text and triggers search on Enter or button click.
- `MovieCard` tests verify title, year, poster handling, and callback invocation.

Example `SearchBar` test snippet:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

it('calls onChange and onSearch', async () => {
  const onChange = vi.fn()
  const onSearch = vi.fn()
  const user = userEvent.setup()

  render(<SearchBar value="" onChange={onChange} onSearch={onSearch} />)
  await user.type(screen.getByPlaceholderText(/search for movies/i), 'Inception')
  await user.click(screen.getByRole('button', { name: /search/i }))
  expect(onChange).toHaveBeenCalled()
  expect(onSearch).toHaveBeenCalled()
})
```

## 11. API Service Testing

- Tests cover successful responses, API 'no results' responses, and network errors.
- `searchMovies` and `getMovieDetails` both have tests that assert correct normalization of fields and error messaging.

Example of testing error handling:

```js
global.fetch = vi.fn(() => Promise.resolve({ ok: false }))
await expect(searchMovies('X')).rejects.toThrow(/Failed to search movies/i)
```

## 12. Integration Testing

- The integration test (`src/__tests__/search.integration.test.jsx`) verifies a full search flow: setting the input, clicking Search, the mocked API returning results, and the UI rendering the movie card.
- The test uses `fireEvent.change`, `fireEvent.click`, `waitFor()` and `findByText()` to follow RTL best practices and avoid `act(...)` warnings.

Integration test (key parts):

```js
vi.spyOn(api, 'searchMovies').mockResolvedValue([{ imdbID: 'i1', title: 'Found', year: '2020', type: 'movie', poster: 'N/A' }])

render(<TestApp />)
fireEvent.change(screen.getByPlaceholderText(/search for movies/i), { target: { value: 'Found' } })
fireEvent.click(screen.getByRole('button', { name: /search/i }))
await waitFor(() => expect(api.searchMovies).toHaveBeenCalledWith('Found'))
expect(await screen.findByText('Found')).toBeInTheDocument()
```

## 13. API Mocking

- Tests mock `fetch` directly or use Vitest's `vi.spyOn` on the API module to avoid calling the live OMDb service.

Example using `vi.spyOn`:

```js
import * as api from '../../services/movieApi'

vi.spyOn(api, 'searchMovies').mockResolvedValue([{ imdbID: 'tt1', title: 'Mocked', year: '2021', type: 'movie', poster: 'N/A' }])
// ...run test
vi.restoreAllMocks()
```

Example using a `fetch` mock:

```js
global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({ Response: 'True', Search: [...] })
}))
```

## 14. User Interaction Testing

- Most component tests use `userEvent.setup()` to simulate typing and clicking where asynchronous browser-like behavior is desired.
- The integration test uses `fireEvent` for synchronous DOM updates to avoid `act(...)` warnings when state updates are scheduled after mocked promises resolve.

Example `userEvent` usage:

```js
const user = userEvent.setup()
await user.type(input, 'Inception')
await user.click(button)
```

Example `fireEvent` usage (integration test):

```js
fireEvent.change(input, { target: { value: 'Found' } })
fireEvent.click(searchButton)
```

## 15. Test Cases and Scenarios

| Test file | Type | Validates |
|---|---:|---|
| `src/services/movieApi.test.js` | Unit | API response mapping, error handling, no-results handling |
| `src/components/SearchBar/SearchBar.test.jsx` | Unit | Input behaviour, onChange, onSearch on button and Enter |
| `src/components/MovieCard/MovieCard.test.jsx` | Unit | Renders title/year/poster, placeholder when no image, onSelect callback |
| `src/components/MovieGrid/MovieGrid.test.jsx` | Unit | Renders multiple movies and event propagation |
| `src/components/EmptyState/EmptyState.test.jsx` | Unit | Renders empty-state prompts |
| `src/components/ErrorMessage/ErrorMessage.test.jsx` | Unit | Displays error message, Retry button calls callback |
| `src/__tests__/search.integration.test.jsx` | Integration | End-to-end search flow (input → API → results) |

## 16. Test Results (numerical)

- Test files: **7**
- Total tests: **18**
- Passed: **18 / 18**
- Final status: All tests passed successfully.

Coverage summary (if run via `npm run test:coverage`):
- Coverage provider: `c8` (configured in `vitest.config.js`).
- Reports available in `coverage/` (text and HTML reporters configured).

## 17. Debugging Process

Issue discovered: Repeated React warning during integration testing:

```
Warning: An update to TestApp inside a test was not wrapped in act(...).
```

Root cause:
- The integration test used `userEvent` and immediately asserted DOM state while the component scheduled state updates after a mocked promise resolved. Some updates happened outside RTL's `act` wrapper.

Fix implemented:
- Replaced the `userEvent` sequence in the integration test with `fireEvent.change` and `fireEvent.click` to synchronously set the input value and trigger the search handler.
- Used `waitFor()` to assert the API call and `findByText()` to wait for the final DOM update. Restored mocks in `afterEach()` with `vi.restoreAllMocks()`.

This approach follows RTL best practices and removed the warning without weakening the test.

## 18. Bugs and Issues Identified

- `act(...)` warnings in the integration test (resolved by using `fireEvent` + `waitFor` + `findBy*`).
- ESLint did not recognize Vitest globals in some environments; fixed by importing specific `vitest` functions in test files and enabling globals in `vitest.config.js`.

## 19. Solutions Implemented

- Updated `src/services/movieApi.js` to accept `process.env.VITE_OMDB_API_KEY` as a fallback during tests.
- Added `vitest.config.js` and `src/test/setupTests.js` to centralize test setup and `jest-dom` matchers.
- Wrote unit and integration tests (7 test files, 18 tests total). 
- Adjusted the integration test to remove `act(...)` warnings.

## 20. Code Quality Assurance

- ESLint is configured and runs via `npm run lint`.
- Test files include explicit imports of `describe`, `it`, `expect`, and `vi` where needed to avoid ESLint "not defined" errors.

## 21. ESLint Validation

- Command used: `npm run lint`.
- Result: completed successfully with no errors after test files were adjusted to import Vitest helpers.

## 22. Production Build Validation

- Command used: `npm run build`.
- Result: Vite built the production bundle successfully.

## 23. Build and Performance Results (numerical)

- Modules transformed: **49**
- Final JavaScript bundle size: **149.06 kB** (uncompressed)
- Gzipped JavaScript bundle size: **48.03 kB**
- Final CSS bundle size: **4.75 kB** (uncompressed)
- Gzipped CSS bundle size: **1.53 kB**

These numbers were measured from the Vite build output and are included here as performance baselines for Week 5.

## 24. Challenges Faced

- Avoiding `act(...)` warnings while keeping the integration test realistic.
- Ensuring ESLint and Vitest coexist without false positives for globals.
- Mocking API calls reliably across unit and integration tests.

## 25. Key Learning Outcomes

- Use `findBy*` and `waitFor` to await async UI updates in RTL.
- Prefer `userEvent` for browser-like interactions, but `fireEvent` can be used when synchronous control is needed to avoid `act` timing issues.
- Mock external services for deterministic tests.
- Keep tests focused on user-visible behavior.

## 26. Future Improvements (measurable goals)

- Increase test coverage to at least **80%** overall (current coverage baseline available via `npm run test:coverage`).
- Add 5 more integration tests covering:
  - Loading → success flow with multiple results
  - API error → ErrorMessage → Retry action
  - Movie details screen navigation and fetch
  - Accessibility checks (keyboard navigation)
  - Edge cases for unusual API responses
- Improve loading performance by reducing JS bundle size by **15%** (target: ~126 kB) via code-splitting and eliminating unused dependencies.
- Add continuous integration: GitHub Actions to run `npm test` and `npm run lint` on each PR.

## 27. Conclusion

This Week 5 submission for CineScope demonstrates a focused effort on testing, debugging, and code quality assurance. All tests (7 files, 18 tests) pass. ESLint and the production build both succeed. The repository now contains a clear testing setup, robust unit and integration tests that mock external APIs, and documented next steps with measurable goals.

## Quick Start — Commands

```bash
npm install
npm run dev      # start dev server
npm test         # run tests once
npm run lint     # run ESLint
npm run build    # build production bundle
```

---

If you want, I can also:

- Add a GitHub Actions workflow to run tests and lint on push/PR.
- Generate an HTML coverage report and attach it to this repo.
- Create a short checklist file for the Week 6 next-step tasks.

Prepared by: CineScope — Week 5 testing & QA
# CineScope

Discover your next favorite movie.

## Overview

CineScope is a small React app built with Vite that lets users search movies using the OMDb API, view results, and open detailed movie information.

## Features

- Search movies (by title)
- Loading and error states
- Responsive movie card grid
- Accessible details modal
- Data normalization and service layer

## Tech

- React
- Vite
- JavaScript
- Regular CSS

## Setup

1. Obtain an OMDb API key at https://www.omdbapi.com/apikey.aspx
2. Create a `.env` file in the project root and add:

```
VITE_OMDB_API_KEY=your_api_key_here
```

3. Install dependencies and run:

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run preview` — preview build
- `npm run lint` — run ESLint (optional)

## Project Structure

See the `src/` folder for component structure.

## Notes

- Do not commit your `.env` file; `.env` is in `.gitignore`.
- If you see "Missing API key" errors, ensure `VITE_OMDB_API_KEY` is set.
