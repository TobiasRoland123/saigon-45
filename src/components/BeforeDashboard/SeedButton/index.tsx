'use client'

import { toast } from '@payloadcms/ui'
import React, { useState } from 'react'

import './index.scss'

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)

  const handleClick = async () => {
    if (
      !window.confirm(
        'This will delete and replace all content in the connected database. Continue?',
      )
    ) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/next/seed', { method: 'POST', credentials: 'include' })

      if (!response.ok) throw new Error('Unable to seed the database.')

      setSeeded(true)
      toast.success('Connected database seeded.')
    } catch {
      toast.error('Unable to seed the database.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button className="seedButton" disabled={loading || seeded} onClick={handleClick} type="button">
      {loading ? 'Seeding...' : seeded ? 'Seeded' : 'Seed connected database'}
    </button>
  )
}
