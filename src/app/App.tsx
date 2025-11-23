import { BrowserRouter } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from './routes/AppRoutes'
import { FeatureErrorBoundary } from '../app/error-boundaries'
import { initializeDefaultData } from '@/data/services/defaultData'

function App() {
  // Initialize default data on app load
  useEffect(() => {
    initializeDefaultData().catch(console.error)
  }, [])

  return (
    <FeatureErrorBoundary moduleName="App">
      <BrowserRouter>
        <AppProviders>
          <AppRoutes />
        </AppProviders>
      </BrowserRouter>
    </FeatureErrorBoundary>
  )
}

export default App

