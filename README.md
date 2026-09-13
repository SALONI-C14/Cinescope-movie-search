# CineScope — Week 6: Performance Optimization, Responsive Design, and Accessibility

## Project Overview

CineScope is an existing React + Vite movie-search application powered by the OMDb API. Users can search for movies, browse responsive result cards, and open a dialog containing expanded information such as the poster, year, genre, runtime, rating, plot, director, and actors.

Week 6 improves the established application’s loading behavior, responsive presentation, accessibility, and validation coverage without changing its core search flow.

## Week 6 Objectives

- Improve performance where the implementation has a measurable or practical benefit.
- Use code splitting and lazy loading for UI not needed on the initial screen.
- Reduce unnecessary repeat requests for movie details.
- Keep the search, result grid, and dialog usable across screen sizes.
- Improve semantic HTML, keyboard interaction, accessible names, and focus visibility.
- Verify behavior through automated tests, linting, and a production build.

## Performance Optimizations

### Lazy loading and code splitting

The movie-details dialog is not required until a visitor selects a title. It is imported with `React.lazy()` and rendered in `Suspense`, allowing Vite to build it as a separate on-demand chunk.

```jsx
const MovieDetails = lazy(() => import('./components/MovieDetails/MovieDetails'))

{(selectedMovie || detailsLoading || detailsError) && (
  <Suspense fallback={<div className="dialog-loading" role="status">Loading movie details…</div>}>
    <MovieDetails movie={selectedMovie} loading={detailsLoading} error={detailsError} onClose={closeDetails} />
  </Suspense>
)}
```

The fallback gives users a loading status while the separate dialog module is retrieved.

### Stable rendering and detail caching

`MovieGrid` and `MovieCard` use `React.memo`, while callbacks passed to child components use `useCallback`. This avoids re-rendering result cards when their stable inputs have not changed.

Movie details are cached in memory by IMDb ID for the current browser session. Reopening a previously viewed title can use the cached response instead of making another details request:

```jsx
const detailsCache = useRef(new Map())
const cachedDetails = detailsCache.current.get(imdbID)
const details = cachedDetails || await getMovieDetails(imdbID)

if (!cachedDetails) detailsCache.current.set(imdbID, details)
```

The existing OMDb API-key environment variable flow remains unchanged.

## Lighthouse Results

These are the final measured Lighthouse results. Scores can vary with browser version, network and device conditions, installed browser extensions, and other test-environment factors.

| Category | Score |
|---|---:|
| Performance | 92 |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

| Performance metric | Result |
|---|---:|
| First Contentful Paint | 1.0 s |
| Largest Contentful Paint | 1.7 s |
| Total Blocking Time | 0 ms |
| Cumulative Layout Shift | 0.008 |
| Speed Index | 1.0 s |

## Responsive Design

The result grid adjusts from four columns at larger widths to three columns at 1024px and below, two at 768px and below, and one at 480px and below:

```css
.movie-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
@media (max-width: 1024px) { .movie-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .movie-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .movie-grid { grid-template-columns: 1fr; } }
```

- Page padding reduces at 768px and 425px to retain usable content width.
- The search form stacks its input and submit button on narrow screens.
- The details dialog switches to a vertical layout at 768px, limits its height to the viewport, and scrolls internally so long content remains usable.
- The narrow-screen error layout stacks its content and control rather than compressing them horizontally.

## Accessibility Improvements

- Semantic `header`, `main`, `section`, `article`, and `footer` elements structure the interface.
- Search uses a native form, an associated visually-hidden label, and a native submit button.
- Movie poster images have title-based alternate text; missing posters use a non-image placeholder.
- Every card exposes a native, descriptive action button, for example `View details for Inception`.
- The search-results section has a label and polite live region; loading uses `role="status"` and errors use `role="alert"`.
- The details interface uses a modal dialog with `role="dialog"`, `aria-modal="true"`, and an accessible label. Its close control is labeled, receives focus when the dialog opens, and Escape closes the dialog.
- `:focus-visible` styles provide a visible focus indicator for links, inputs, and buttons.

These practices support accessible interaction but do not constitute a claim of formal WCAG certification or complete compliance.

## Testing and Code Quality

The current automated validation result is:

| Check | Result |
|---|---|
| Test files | 8 passed |
| Tests | 19 passed |
| Linter | Passed |
| Production build | Passed |

The project uses Vitest, React Testing Library, `@testing-library/user-event`, and ESLint. Coverage includes API behavior, SearchBar, MovieCard, MovieGrid, EmptyState, ErrorMessage, MovieDetails, and a search integration flow.

```bash
npm test
npm run lint
npm run build
```

## Technologies Used

- React 18
- React DOM
- Vite 5 and `@vitejs/plugin-react`
- OMDb API
- Vitest
- React Testing Library and `@testing-library/user-event`
- JSDOM
- ESLint with React and React Hooks plugins
- HTML and CSS media queries

## Project Features

- Search OMDb for movies by title.
- Display search results in responsive movie cards.
- Show poster, title, year, and type for each result.
- Open a full movie-details dialog containing extended metadata.
- Show loading, error, and empty states.
- Retry an unsuccessful search.
- Lazy-load the details dialog and cache opened detail responses in memory.
- Support keyboard-accessible search, buttons, dialog closing with Escape, and visible focus states.

## Installation and Setup

```bash
git clone <repository-url>
cd <repository-directory>
npm install
npm run dev
```

Create a `.env` file in the project root and set a valid OMDb API key before searching:

```env
VITE_OMDB_API_KEY=your_omdb_api_key
```

Open the local URL printed by Vite in your browser.

## Week 6 Conclusion

Week 6 strengthened CineScope without replacing its existing functionality. The details interface is code-split and loaded only when needed, repeat detail views can use an in-memory cache, and result rendering avoids unnecessary work when stable props are passed. Responsive CSS keeps the search, cards, feedback states, and details dialog practical from narrow mobile layouts to larger desktop screens.

The application also improves its accessible path with semantic controls, labels, meaningful poster text, live status feedback, visible focus states, and keyboard-aware dialog behavior. Final validation recorded Lighthouse scores of 92 for Performance, 93 for Accessibility, 100 for Best Practices, and 100 for SEO, alongside 19 passing tests, a clean lint run, and a successful production build.

## Author

Developed as part of a ReactJS Internship Project.
