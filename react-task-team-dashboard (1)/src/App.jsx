import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom'
import { AuthShell, AppShell } from './components/Layout'
import { LoginForm, ForgotPasswordForm } from './components/AuthForms'
import Dashboard from './components/Dashboard'
import { ShieldCheck, MonitorSmartphone } from 'lucide-react'

function HomePage() {
  return (
    <main className="auth-page">
      <div className="panel auth-card">
        <div className="brand">
          <div className="logo">TM</div>
          <div>
            <strong>Task & Team Dashboard</strong>
            <div className="muted">React.js project</div>
          </div>
        </div>
        <h1>Modern dashboard assignment</h1>
        <p className="subtitle">
          Clean UI, reusable components, proper folder structure, task management, team members, and responsive design.
        </p>
        <div className="feature-row">
          <div className="mini-feature"><ShieldCheck size={18} /> Validated forms</div>
          <div className="mini-feature"><MonitorSmartphone size={18} /> Mobile friendly</div>
        </div>
        <div className="actions" style={{ marginTop: 18 }}>
          <Link className="btn primary" to="/login">Open Login</Link>
          <Link className="btn ghost" to="/dashboard">Open Dashboard</Link>
        </div>
      </div>
    </main>
  )
}

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  if (loggedIn) return <Navigate to="/dashboard" replace />
  return (
    <AuthShell
      title="Login"
      subtitle="Authentication is mocked for the assignment, but validation is included."
    >
      <LoginForm onSuccess={() => setLoggedIn(true)} />
      <div className="hint">
        <Link to="/dashboard">Skip to dashboard</Link>
      </div>
    </AuthShell>
  )
}

function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot Password"
      subtitle="Enter your email to simulate a password reset flow."
    >
      <ForgotPasswordForm />
      <div className="hint">
        <Link to="/login">Back to login</Link>
      </div>
    </AuthShell>
  )
}

function DashboardPage() {
  return (
    <AppShell>
      <div className="mobile-top">
        <div>
          <h1 className="page-title">Task & Team Dashboard</h1>
          <p className="subtitle">
            Manage progress, track tasks, and organize your team with a responsive React interface.
          </p>
        </div>
        <Link className="btn ghost" to="/login">Logout</Link>
      </div>
      <Dashboard />
    </AppShell>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
