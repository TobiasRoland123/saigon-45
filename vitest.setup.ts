import dotenv from 'dotenv'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

dotenv.config({ path: ['.env.local', '.env'] })

// This project does not set `globals: true`, so React Testing Library's automatic
// cleanup does not fire — unmount rendered trees between tests explicitly.
afterEach(() => {
  cleanup()
})
