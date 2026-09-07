import React from 'react'
import './Header.css'

export default function Header(){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">Cine<span>Scope</span></div>
        <nav className="nav">
          <a href="#">Home</a>
        </nav>
      </div>
    </header>
  )
}
