import React, {useEffect} from 'react'
import './MovieDetails.css'
import Loading from '../Loading/Loading'

export default function MovieDetails({movie,loading,error,onClose}){
  useEffect(()=>{
    function onKey(e){
      if(e.key === 'Escape') onClose()
    }
    if(movie || loading || error) document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[movie,loading,error,onClose])

  if(!movie && !loading && !error) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={movie ? movie.title : 'Movie details'} onClick={onClose}>
      <div className="modal-content" onClick={e=>e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        {loading && <Loading />}
        {error && <div className="details-error">{error}</div>}
        {movie && (
          <div className="details-inner">
            <div className="details-poster">
              {movie.poster && movie.poster !== 'N/A' ? (
                <img src={movie.poster} alt={`${movie.title} poster`} />
              ) : (
                <div className="poster-placeholder">No Image</div>
              )}
            </div>
            <div className="details-body">
              <h2>{movie.title} <span className="muted">({movie.year})</span></h2>
              <p className="meta">{movie.genre} • {movie.runtime} • IMDb: {movie.rating}</p>
              <p className="plot">{movie.plot}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Main actors:</strong> {movie.actors}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
