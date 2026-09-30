import { Link } from 'react-router'
import './UserProfile.css'

export default function UserProfile({ name, tier, avatar, settingsTo }) {
  return (
    <div className="user-profile">
      <div className="user-profile__text">
        <span className="user-profile__name">{name}</span>
        <span className="user-profile__tier">{tier}</span>
        {settingsTo && (
          <Link className="user-profile__settings" to={settingsTo}>
            Settings
          </Link>
        )}
      </div>
      <img className="user-profile__avatar" src={avatar} alt="" width="40" height="40" />
    </div>
  )
}
