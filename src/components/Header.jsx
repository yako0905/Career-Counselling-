import { Link, NavLink } from 'react-router-dom'
import compassIcon from '../assets/compass.svg'
import messageIcon from '../assets/message-circle.svg'
import './Header.css'

export default function Header() {
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
        <Link to="/counsellor" className="cta">
          <img src={messageIcon} alt="" />
          Talk to a Counsellor
        </Link>
      </nav>
    </header>
  )
}