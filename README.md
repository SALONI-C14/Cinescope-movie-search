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
