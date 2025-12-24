import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} OdoWatch. All rights reserved.</p>
            <nav className="footer-nav">
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact">Contact Us</a>
            </nav>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App

