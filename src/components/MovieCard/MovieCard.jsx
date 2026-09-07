import React from 'react'
import './MovieCard.css'

export default function MovieCard({movie,onSelect}){
  const hasPoster = movie.poster && movie.poster !== 'N/A'

  return (
    <article className="movie-card" tabIndex={0} onClick={() => onSelect(movie.imdbID)} onKeyDown={(e)=>{if(e.key==='Enter') onSelect(movie.imdbID)}}>
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
        <div className="movie-meta">
          <span>{movie.year}</span>
          <span className="dot">•</span>
          <span>{movie.type}</span>
        </div>
        <button className="details-btn" onClick={(e)=>{e.stopPropagation(); onSelect(movie.imdbID)}}>View Details</button>
      </div>
    </article>
  )
}
