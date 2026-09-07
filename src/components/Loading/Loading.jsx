import React from 'react'
import './Loading.css'

export default function Loading(){
  return (
    <div className="loading-wrap" role="status" aria-live="polite">
      <div className="spinner" />
      <div className="loading-text">Loading...</div>
    </div>
  )
}
