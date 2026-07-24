import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__content`}>
        <div>
          <h2>Development tools</h2>
          <p>Reset the connected database and populate it with Saigon 45 demo content.</p>
        </div>
        <SeedButton />
      </div>
    </div>
  )
}

export default BeforeDashboard
