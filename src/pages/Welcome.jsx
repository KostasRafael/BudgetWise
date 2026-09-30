import Navbar from '../components/Navbar/Navbar.jsx'
import Button from '../components/Button/Button.jsx'
import Hero from '../components/Hero/Hero.jsx'
import './Welcome.css'

export default function Welcome() {
  return (
    <div className="welcome">
      <Navbar>
        <Button variant="link" to="/login">
          Log In
        </Button>
        <Button variant="primary" size="sm" to="/signup">
          Sign Up
        </Button>
      </Navbar>
      <Hero />
    </div>
  )
}
