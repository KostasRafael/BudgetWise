import { useState } from 'react'
import Panel from '../Panel/Panel.jsx'
import TextField from '../TextField/TextField.jsx'
import Button from '../Button/Button.jsx'
import FormMessage from '../FormMessage/FormMessage.jsx'
import userIcon from '../../assets/icons/user.svg'
import mailIcon from '../../assets/icons/mail.svg'

export default function ProfileForm({ user, onSave }) {
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const { name, email } = Object.fromEntries(new FormData(event.currentTarget))
    if (!name.trim() || !email.trim()) return

    setStatus(null)
    setSaving(true)
    try {
      await onSave({ name: name.trim(), email: email.trim() })
      setStatus({ tone: 'success', text: 'Your details have been updated.' })
    } catch (err) {
      setStatus({ tone: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Panel as="form" title="Profile Details" subtitle="Update the name and email on your account." onSubmit={handleSubmit}>
      <FormMessage tone={status?.tone}>{status?.text}</FormMessage>
      <div className="settings__fields">
        <TextField
          label="Full Name"
          icon={userIcon}
          name="name"
          defaultValue={user?.name}
          autoComplete="name"
          required
        />
        <TextField
          label="Email Address"
          icon={mailIcon}
          name="email"
          type="email"
          defaultValue={user?.email}
          autoComplete="email"
          required
        />
      </div>
      <Button type="submit" block disabled={saving}>
        {saving ? 'Saving…' : 'Save Changes'}
      </Button>
    </Panel>
  )
}
