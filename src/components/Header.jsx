import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../useAuth'
import compassIcon from '../assets/compass.svg'
import messageIcon from '../assets/message-circle.svg'
import './Header.css'

export default function Header() {
  const { user, firstName, initials, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/')
    logout()
  }

  return (
    <header className="header">
      <Link to="/" className="brand">
        <div className="brand-mark">
          <img src={compassIcon} alt="" />
        </div>
        <span className="brand-name">CareerPath</span>
      </Link>

      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/career-details">Explore Careers</NavLink>
        <NavLink to="/assessment">Assessment</NavLink>
        <NavLink to="/compare">Compare</NavLink>
        <NavLink to="/roadmap">Roadmap</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <Link to="/counsellor" className="cta">
          <img src={messageIcon} alt="" />
          Talk to a Counsellor
        </Link>

        {user ? (
          <div className="user-box">
            <Link to="/dashboard" className="user-chip" title={user.name}>
              <span className="user-avatar">{initials}</span>
              <span className="user-name">{firstName}</span>
            </Link>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">Log in</Link>
        )}
      </nav>
    </header>
  )
}