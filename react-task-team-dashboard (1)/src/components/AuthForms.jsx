import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { isValidEmail } from '../utils/validation'

export function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidEmail(form.email)) return setError('Enter a valid email address.')
    if (form.password.trim().length < 4) return setError('Password must be at least 4 characters.')
    setError('')
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <div>
        <label>Email</label>
        <input
          className="field"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="name@example.com"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          className="field"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
        />
      </div>
      {error ? <div className="error">{error}</div> : null}
      <button className="btn primary" type="submit">Login</button>
      <div className="hint">
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
    </form>
  )
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) return setError('Please enter a valid email.')
    setError('')
    setMessage('Reset link sent successfully to your email.')
  }

  return (
    <form onSubmit={handleSubmit} className="stack">
      <div>
        <label>Email</label>
        <input
          className="field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
        />
      </div>
      {error ? <div className="error">{error}</div> : null}
      {message ? <div className="success">{message}</div> : null}
      <button className="btn primary" type="submit">Send Reset Link</button>
    </form>
  )
}
