import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './MovieGrid.css'

export default function MovieGrid({movies,onSelect}){
  return (
    <div className="movie-grid">
      {movies.map(m => (
        <MovieCard key={m.imdbID} movie={m} onSelect={onSelect} />
      ))}
    </div>
  )
}
