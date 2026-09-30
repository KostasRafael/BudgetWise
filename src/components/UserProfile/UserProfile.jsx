import { Link } from 'react-router'
import userIcon from '../../assets/icons/user.svg'
import './UserProfile.css'

export default function UserProfile({ name, settingsTo }) {
  return (
    <div className="user-profile">
      <div className="user-profile__text">
        <span className="user-profile__name">{name}</span>
        {settingsTo && (
          <Link className="user-profile__settings" to={settingsTo}>
            Settings
          </Link>
        )}
      </div>
      <span className="user-profile__avatar" aria-hidden="true">
        <img src={userIcon} alt="" width="20" height="20" />
      </span>
    </div>
  )
}
