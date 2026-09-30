import Logo from '../Logo/Logo.jsx'
import './Navbar.css'

export default function Navbar({ children }) {
  return (
    <header className="navbar">
      <Logo />
      <nav className="navbar__actions">{children}</nav>
    </header>
  )
}
