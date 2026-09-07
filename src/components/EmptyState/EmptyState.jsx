import React from 'react'
import './EmptyState.css'

export default function EmptyState(){
  return (
    <div className="empty">
      <h3>Search for a movie to start exploring.</h3>
      <p className="muted">Try keywords like "Inception", "Avatar", or "Titanic".</p>
    </div>
  )
}
