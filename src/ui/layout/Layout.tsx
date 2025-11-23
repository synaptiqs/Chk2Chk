import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
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
            <nav className="hidden md:flex gap-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Dashboard
              </Link>
              <Link to="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
                Categories
              </Link>
            </nav>
          </div>
        </div>
      </header>
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
