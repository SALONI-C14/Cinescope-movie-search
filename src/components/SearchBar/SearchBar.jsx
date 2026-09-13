import React from 'react'
import './SearchBar.css'

export default function SearchBar({value,onChange,onSearch}){
  return (
    <form className="searchbar" onSubmit={(event) => { event.preventDefault(); onSearch() }}>
      <label htmlFor="search" className="visually-hidden">Search movies</label>
      <input
        id="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search for movies, e.g. Inception, Avatar"
        aria-label="Search movies"
      />
      <button type="submit">Search</button>
    </form>
  )
}
