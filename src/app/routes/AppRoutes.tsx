import { Routes, Route } from 'react-router-dom'
import { Dashboard } from '../../features/dashboard/Dashboard'
import { CategoriesPage } from '../../features/categories'
import { ExpensesPage } from '../../features/expenses'
import { BillsPage } from '../../features/bills/pages/BillsPage'
import { DebtPage } from '../../features/debt/pages/DebtPage'
import { EnvelopesPage } from '../../features/envelopes/pages/EnvelopesPage'
import { SettingsPage } from '../../features/settings/pages/SettingsPage'
import { Layout } from '../../ui/layout/Layout'

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/envelopes" element={<EnvelopesPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/debt" element={<DebtPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Add more routes as features are built */}
      </Routes>
    </Layout>
  )
}
