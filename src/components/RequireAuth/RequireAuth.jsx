import { Navigate, useLocation } from 'react-router'
import { isLoggedIn } from '../../api/auth.js'

// Sends anyone without a login token to /login, remembering where they were headed.
export default function RequireAuth({ children }) {
  const location = useLocation()
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return children
}
