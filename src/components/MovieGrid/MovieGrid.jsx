import React, { memo } from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './MovieGrid.css'

function MovieGrid({movies,onSelect}){
  return (
    <div className="movie-grid">
      {movies.map(m => (
        <MovieCard key={m.imdbID} movie={m} onSelect={onSelect} />
      ))}
    </div>
  )
}

export default memo(MovieGrid)
