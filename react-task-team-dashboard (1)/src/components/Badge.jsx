import React from 'react'

export default function Badge({ label, type }) {
  const cls = type === 'priority'
    ? label.toLowerCase()
    : label.toLowerCase().replace(/\s+/g, '')
  return <span className={`badge ${cls}`}>{label}</span>
}
