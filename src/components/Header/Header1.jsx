import React from 'react'
import './Header1.css'

export const Header1 = () => {
  return (
    <header className="header">
    <nav className="navbar">
      <ul className="nav-items">
        <li>HOME</li>
        <li>Service</li>
        <li>Register</li>
        <li>Help</li>
        <li>Contact Us</li>
      </ul>
      <div className="nav-right">
        <button className="theme-toggle">🌙</button>
        {/* <div className="dropdown"> */}
          {/* <button className="login-btn">Logout</button> */}
          {/* <div className="dropdown-content">
            <Link to='/employee'>Employee</Link>
            <Link to='/employeer'>Employeer</Link>
            <Link to='/'>Admin</Link>
          </div> */}
        {/* </div> */}
      </div>
    </nav>
  </header>
  )
}
