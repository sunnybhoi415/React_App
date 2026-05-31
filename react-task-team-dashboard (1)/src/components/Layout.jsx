import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, LogOut, LockKeyhole, Users } from 'lucide-react'

export function AppShell({ children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">TM</div>
          <div>
            <strong>Dashboard</strong>
            <div className="muted">Task & Team Management</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LockKeyhole size={18} /> Login
          </NavLink>
          <NavLink to="/forgot-password" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={18} /> Forgot Password
          </NavLink>
        </nav>

        <Link className="btn ghost nav-logout" to="/login">
          <LogOut size={16} /> Logout
        </Link>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  )
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <main className="auth-page">
      <div className="panel auth-card">
        <div className="brand">
          <div className="logo">TM</div>
          <div>
            <strong>Task & Team Dashboard</strong>
            <div className="muted">React assignment</div>
          </div>
        </div>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
        {children}
      </div>
    </main>
  )
}
