import { Link } from 'react-router'
import trendingUp from '../../assets/trending-up.svg'
import './Logo.css'

export default function Logo() {
  return (
    <Link className="logo" to="/">
      <span className="logo__icon">
        <img src={trendingUp} alt="" width="16" height="16" />
      </span>
      <span className="logo__text">BudgetWise</span>
    </Link>
  )
}
