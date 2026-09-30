import Badge from '../Badge/Badge.jsx'
import Button from '../Button/Button.jsx'
import SocialProof from '../SocialProof/SocialProof.jsx'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__text">
          <Badge>v2.0 Finance Console</Badge>
          <h1 className="hero__title">Take control of your finances. Wise tracking.</h1>
          <p className="hero__subtitle">
            BudgetWise is a clean, modern, and confident finance dashboard engineered to track
            your monthly caps, manage expenses in real-time, and preserve your savings
            automatically.
          </p>
        </div>
        <div className="hero__ctas">
          <Button variant="primary" to="/signup">
            Sign Up Free
          </Button>
          <Button variant="secondary" to="/login">
            Log In
          </Button>
        </div>
        <SocialProof />
      </div>
    </section>
  )
}
