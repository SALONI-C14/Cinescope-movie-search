import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchMovies, getMovieDetails } from './movieApi'

const originalFetch = global.fetch

beforeEach(() => {
  process.env.VITE_OMDB_API_KEY = 'testkey'
})

afterEach(() => {
  global.fetch = originalFetch
  delete process.env.VITE_OMDB_API_KEY
  vi.restoreAllMocks()
})

describe('movieApi', () => {
  it('returns movies on successful search', async () => {
    const fake = { Search: [{ imdbID: 'x1', Title: 'X', Year: '2020', Type: 'movie', Poster: 'N/A' }], Response: 'True' }
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(fake) }))
    const res = await searchMovies('X')
    expect(res).toHaveLength(1)
    expect(res[0].imdbID).toBe('x1')
  })

  it('returns empty array when API says no results', async () => {
    const fake = { Response: 'False', Error: 'Movie not found!' }
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(fake) }))
    const res = await searchMovies('nothing')
    expect(Array.isArray(res)).toBe(true)
    expect(res).toHaveLength(0)
  })

  it('throws on network error', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }))
    await expect(searchMovies('X')).rejects.toThrow(/Failed to search movies/i)
  })

  it('gets movie details on success', async () => {
    const fake = { Response: 'True', imdbID: 'd1', Title: 'Detail', Year: '2010', Genre: 'Drama', Runtime: '120 min', imdbRating: '7.5', Plot: 'Plot', Director: 'Dir', Actors: 'A', Poster: 'N/A' }
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(fake) }))
    const res = await getMovieDetails('d1')
    expect(res.imdbID).toBe('d1')
    expect(res.title).toBe('Detail')
  })

  it('throws when details not found', async () => {
    const fake = { Response: 'False', Error: 'Movie not found' }
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(fake) }))
    await expect(getMovieDetails('nope')).rejects.toThrow(/Movie details not found|Failed to load movie details/i)
  })
})
