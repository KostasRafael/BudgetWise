import AvatarGroup from '../AvatarGroup/AvatarGroup.jsx'
import avatar1 from '../../assets/avatars/avatar-1.png'
import avatar2 from '../../assets/avatars/avatar-2.png'
import avatar3 from '../../assets/avatars/avatar-3.png'
import './SocialProof.css'

export default function SocialProof() {
  return (
    <div className="social-proof">
      <p className="social-proof__label">Trusted by 40,000+ Smart Investors</p>
      <div className="social-proof__row">
        <AvatarGroup avatars={[avatar1, avatar2, avatar3]} />
        <p className="social-proof__rating">Rated 4.9/5 stars for clean aesthetic</p>
      </div>
    </div>
  )
}
