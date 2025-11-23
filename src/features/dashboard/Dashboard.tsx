import { FeatureErrorBoundary } from '../../app/error-boundaries'
import { useIncome } from '../income'
import { useExpenses } from '../expenses'
import { useEnvelopes } from '../envelopes'
import { useDebt } from '../debt'
import { formatCurrency } from '@/core/utils'
import { Card } from '@/ui/components/cards/Card'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { incomes, loading: incomeLoading } = useIncome()
  const { expenses, loading: expenseLoading } = useExpenses()
  const { envelopes, loading: envelopeLoading } = useEnvelopes()
  const { debts } = useDebt()

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const totalEnvelopes = envelopes.reduce((sum, env) => sum + env.allocatedAmount, 0)
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0)
  const balance = totalIncome - totalExpenses

  return (
    <FeatureErrorBoundary moduleName="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-2">Welcome to Chk2Chk - Your Budgeting Companion</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/income" className="block">
            <Card>
              <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
                <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">
                  {incomeLoading ? '...' : formatCurrency(totalIncome)}
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/expenses" className="block">
            <Card>
              <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
                <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
                <p className="text-2xl font-bold text-red-600 mt-2">
                  {expenseLoading ? '...' : formatCurrency(totalExpenses)}
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/expenses" className="block">
            <Card>
              <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
                <h3 className="text-sm font-medium text-gray-500">Balance</h3>
                <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(balance)}
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/envelopes" className="block">
            <Card>
              <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
                <h3 className="text-sm font-medium text-gray-500">Envelopes</h3>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {envelopeLoading ? '...' : formatCurrency(totalEnvelopes)}
                </p>
              </div>
            </Card>
          </Link>
        </div>

        {/* Debt Warning */}
        {debts.length > 0 && (
          <Link to="/debt" className="block">
            <Card className="bg-yellow-50 border-yellow-200">
              <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-yellow-900">Debt Detected</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      You have {debts.length} debt account(s) totaling {formatCurrency(totalDebt)}. Remember to prioritize debt payments and keep savings under $1,000.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        )}

        {/* Bills Card */}
        <Link to="/bills" className="block">
          <Card>
            <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
              <h3 className="text-sm font-medium text-gray-500">Bills</h3>
              <p className="text-lg text-gray-600 mt-2">Manage your recurring bills and payments</p>
            </div>
          </Card>
        </Link>

        {/* Categories Card */}
        <Link to="/categories" className="block">
          <Card>
            <div className="w-full text-left hover:opacity-80 active:opacity-70 transition-opacity touch-manipulation">
              <h3 className="text-sm font-medium text-gray-500">Categories</h3>
              <p className="text-lg text-gray-600 mt-2">Manage your expense categories</p>
            </div>
          </Card>
        </Link>
      </div>
    </FeatureErrorBoundary>
  )
}
