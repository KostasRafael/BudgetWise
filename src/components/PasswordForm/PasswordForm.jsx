import { useState } from 'react'
import Panel from '../Panel/Panel.jsx'
import TextField from '../TextField/TextField.jsx'
import Button from '../Button/Button.jsx'
import FormMessage from '../FormMessage/FormMessage.jsx'
import lockIcon from '../../assets/icons/lock.svg'

export default function PasswordForm({ onSave }) {
  const [status, setStatus] = useState(null)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const { currentPassword, newPassword, confirmPassword } = Object.fromEntries(new FormData(form))
    if (newPassword !== confirmPassword) {
      setStatus({ tone: 'error', text: 'New passwords do not match.' })
      return
    }

    setStatus(null)
    setSaving(true)
    try {
      await onSave({ currentPassword, newPassword })
      form.reset()
      setStatus({ tone: 'success', text: 'Your password has been changed.' })
    } catch (err) {
      setStatus({ tone: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Panel as="form" title="Change Password" subtitle="Enter your current password to set a new one." onSubmit={handleSubmit}>
      <FormMessage tone={status?.tone}>{status?.text}</FormMessage>
      <div className="settings__fields">
        <TextField
          label="Current Password"
          icon={lockIcon}
          name="currentPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />
        <TextField
          label="New Password"
          icon={lockIcon}
          name="newPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
        <TextField
          label="Confirm New Password"
          icon={lockIcon}
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
      </div>
      <Button type="submit" block disabled={saving}>
        {saving ? 'Updating…' : 'Update Password'}
      </Button>
    </Panel>
  )
}
