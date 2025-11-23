import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { BalanceReminder } from '../components/balance/BalanceReminder'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-primary-600">
                Chk2Chk
              </Link>
              <p className="text-sm text-gray-600">Budgeting for Weekly/Daily Earners</p>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Dashboard
              </Link>
              <Link to="/expenses" className="text-gray-700 hover:text-primary-600 font-medium">
                Expenses
              </Link>
              <Link to="/envelopes" className="text-gray-700 hover:text-primary-600 font-medium">
                Envelopes
              </Link>
              <Link to="/bills" className="text-gray-700 hover:text-primary-600 font-medium">
                Bills
              </Link>
              <Link to="/debt" className="text-gray-700 hover:text-primary-600 font-medium">
                Debt
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
                Categories
              </Link>
              <Link to="/settings" className="text-gray-700 hover:text-primary-600 font-medium">
                Settings
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 border-t border-gray-200 mt-4">
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/expenses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Expenses
                </Link>
                <Link
                  to="/envelopes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Envelopes
                </Link>
                <Link
                  to="/bills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Bills
                </Link>
                <Link
                  to="/debt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Debt
                </Link>
                <Link
                  to="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Categories
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-2 rounded-md hover:bg-gray-50"
                >
                  Settings
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
      <BalanceReminder />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-gray-600 text-center">
            © 2024 Chk2Chk. Built for people who get paid weekly or daily.
          </p>
        </div>
      </footer>
    </div>
  )
}
