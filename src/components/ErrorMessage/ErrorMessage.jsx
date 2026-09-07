import React from 'react'
import './ErrorMessage.css'

export default function ErrorMessage({message,onRetry}){
  return (
    <div className="error-wrap" role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  )
}
