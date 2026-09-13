import React, { memo } from 'react'
import './MovieCard.css'

function MovieCard({movie,onSelect}){
  const hasPoster = movie.poster && movie.poster !== 'N/A'

  return (
    <article className="movie-card">
      <div className="poster-wrap">
        {hasPoster ? (
          <img src={movie.poster} alt={`${movie.title} poster`} />
        ) : (
          <div className="poster-placeholder" aria-hidden>
            <div>No Image</div>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta" aria-label={`${movie.year}, ${movie.type}`}>
          <span>{movie.year}</span>
          <span className="dot" aria-hidden="true">•</span>
          <span>{movie.type}</span>
        </div>
        <button className="details-btn" onClick={() => onSelect(movie.imdbID)} aria-label={`View details for ${movie.title}`}>View Details</button>
      </div>
    </article>
  )
}

export default memo(MovieCard)
