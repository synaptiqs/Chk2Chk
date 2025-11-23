import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from './routes/AppRoutes'
import { FeatureErrorBoundary } from '../app/error-boundaries'

function App() {
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

