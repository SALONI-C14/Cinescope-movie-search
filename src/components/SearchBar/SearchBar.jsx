import React from 'react'
import './SearchBar.css'

export default function SearchBar({value,onChange,onSearch}){
  function handleKey(e){
    if(e.key === 'Enter') onSearch()
  }

  return (
    <div className="searchbar">
      <label htmlFor="search" className="visually-hidden">Search movies</label>
      <input
        id="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Search for movies, e.g. Inception, Avatar"
        aria-label="Search movies"
      />
      <button onClick={onSearch} aria-label="Search">Search</button>
    </div>
  )
}
