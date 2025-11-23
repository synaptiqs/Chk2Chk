import { Routes, Route } from 'react-router-dom'
import { Dashboard } from '../../features/dashboard/Dashboard'
import { CategoriesPage } from '../../features/categories'
import { Layout } from '../../ui/layout/Layout'

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<CategoriesPage />} />
        {/* Add more routes as features are built */}
      </Routes>
    </Layout>
  )
}
