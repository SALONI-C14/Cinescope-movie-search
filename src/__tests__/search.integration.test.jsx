import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import SearchBar from '../components/SearchBar/SearchBar'
import MovieGrid from '../components/MovieGrid/MovieGrid'
import * as api from '../services/movieApi'

function TestApp() {
  const [q, setQ] = React.useState('')
  const [movies, setMovies] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  async function doSearch() {
    setLoading(true)

    try {
      const res = await api.searchMovies(q)
      setMovies(res)
    } catch {
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SearchBar
        value={q}
        onChange={setQ}
        onSearch={doSearch}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <MovieGrid movies={movies} onSelect={() => {}} />
      )}
    </div>
  )
}

describe('Integration: search flow', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('searches and displays results', async () => {
    const fakeMovies = [
      {
        imdbID: 'i1',
        title: 'Found',
        year: '2020',
        type: 'movie',
        poster: 'N/A',
      },
    ]

    vi.spyOn(api, 'searchMovies').mockResolvedValue(fakeMovies)

    render(<TestApp />)

    const searchInput = screen.getByPlaceholderText(/search for movies/i)

    // update the controlled input synchronously
    fireEvent.change(searchInput, { target: { value: 'Found' } })

    // click the search button
    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(api.searchMovies).toHaveBeenCalledWith('Found')
    })

    expect(await screen.findByText('Found')).toBeInTheDocument()
  })
})