import Navbar from '../Navbar/Navbar.jsx'
import './AuthLayout.css'

export default function AuthLayout({ navAction, children }) {
  return (
    <div className="auth-layout">
      <Navbar>{navAction}</Navbar>
      <main className="auth-layout__body">{children}</main>
    </div>
  )
}
