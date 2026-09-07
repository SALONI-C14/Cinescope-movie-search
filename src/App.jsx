import React, { useState } from 'react'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import MovieGrid from './components/MovieGrid/MovieGrid'
import Loading from './components/Loading/Loading'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import EmptyState from './components/EmptyState/EmptyState'
import MovieDetails from './components/MovieDetails/MovieDetails'
import { searchMovies, getMovieDetails } from './services/movieApi'
import './App.css'

export default function App(){
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [detailsError, setDetailsError] = useState(null)

  async function handleSearch(term){
    const trimmed = term.trim()
    if(!trimmed){
      setError('Please enter a movie name to search.')
      setMovies([])
      return
    }
    setError(null)
    setLoading(true)
    setMovies([])
    try{
      const results = await searchMovies(trimmed)
      setMovies(results)
    }catch(e){
      setError(e.message || 'Something went wrong while loading movies. Please try again.')
    }finally{
      setLoading(false)
    }
  }

  async function openDetails(imdbID){
    setSelectedMovie(null)
    setDetailsError(null)
    setDetailsLoading(true)
    try{
      const details = await getMovieDetails(imdbID)
      setSelectedMovie(details)
    }catch(e){
      setDetailsError(e.message || 'Failed to load movie details.')
    }finally{
      setDetailsLoading(false)
    }
  }

  function closeDetails(){
    setSelectedMovie(null)
    setDetailsError(null)
  }

  return (
    <div>
      <Header />
      <main className="container">
        <section className="hero">
          <h1 className="title">CineScope</h1>
          <p className="tagline">Discover your next favorite movie.</p>
        </section>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onSearch={() => handleSearch(searchTerm)}
        />

        <section className="results">
          {loading && <Loading />}
          {error && <ErrorMessage message={error} onRetry={() => handleSearch(searchTerm)} />}
          {!loading && !error && movies.length === 0 && (
            <EmptyState />
          )}
          {!loading && !error && movies.length > 0 && (
            <MovieGrid movies={movies} onSelect={openDetails} />
          )}
        </section>
      </main>

      <MovieDetails
        movie={selectedMovie}
        loading={detailsLoading}
        error={detailsError}
        onClose={closeDetails}
      />

      <footer className="container footer">
        <small>Built with OMDb API • CineScope</small>
      </footer>
    </div>
  )
}
