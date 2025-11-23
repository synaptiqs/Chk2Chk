import { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

/**
 * App-level providers wrapper
 * Add context providers here (theme, auth, etc.)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>
}

