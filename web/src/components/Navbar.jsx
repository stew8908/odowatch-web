import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h1>OdoWatch</h1>
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link 
              to="/privacy" 
              className={location.pathname === '/privacy' ? 'active' : ''}
            >
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

