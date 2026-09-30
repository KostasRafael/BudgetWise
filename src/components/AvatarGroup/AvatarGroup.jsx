import './AvatarGroup.css'

export default function AvatarGroup({ avatars }) {
  return (
    <div className="avatar-group">
      {avatars.map((src, i) => (
        <img key={i} className="avatar-group__item" src={src} alt="" width="36" height="36" />
      ))}
    </div>
  )
}
