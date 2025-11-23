import { FeatureErrorBoundary } from '../../app/error-boundaries'
import { useIncome } from '../income'
import { useExpenses } from '../expenses'
import { useEnvelopes } from '../envelopes'
import { useDebt } from '../debt'
import { formatCurrency } from '@/core/utils'
import { Card } from '@/ui/components/cards/Card'
import { IncomeForm, IncomeList } from '../income'
import { ExpenseForm, ExpenseList } from '../expenses'
import { useState } from 'react'
import { ExportPanel } from '../export'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { incomes, createIncome, deleteIncome, loading: incomeLoading } = useIncome()
  const { expenses, createExpense, deleteExpense, loading: expenseLoading } = useExpenses()
  const { envelopes, loading: envelopeLoading } = useEnvelopes()
  const { debts } = useDebt()
  const [showIncomeForm, setShowIncomeForm] = useState(false)
  const [showExpenseForm, setShowExpenseForm] = useState(false)

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
          <Link to="/" className="block">
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

          <Card>
            <div className="w-full text-left">
              <h3 className="text-sm font-medium text-gray-500">Balance</h3>
              <p className={`text-2xl font-bold mt-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(balance)}
              </p>
            </div>
          </Card>

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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income Section */}
          <Card title="Income">
            <div className="space-y-4">
              {!showIncomeForm ? (
                <button
                  onClick={() => setShowIncomeForm(true)}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Add Income
                </button>
              ) : (
                <IncomeForm
                  onSubmit={async (data) => {
                    await createIncome(data)
                    setShowIncomeForm(false)
                  }}
                  onCancel={() => setShowIncomeForm(false)}
                />
              )}
              <IncomeList
                incomes={incomes.slice(0, 5)}
                onDelete={deleteIncome}
              />
              {incomes.length > 5 && (
                <p className="text-sm text-gray-500 text-center">
                  Showing 5 of {incomes.length} entries
                </p>
              )}
            </div>
          </Card>

          {/* Expenses Section */}
          <Card title="Expenses">
            <div className="space-y-4">
              {!showExpenseForm ? (
                <button
                  onClick={() => setShowExpenseForm(true)}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
                >
                  Add Expense
                </button>
              ) : (
                <ExpenseForm
                  onSubmit={async (data) => {
                    await createExpense(data)
                    setShowExpenseForm(false)
                  }}
                  onCancel={() => setShowExpenseForm(false)}
                />
              )}
              <ExpenseList
                expenses={expenses.slice(0, 5)}
                onDelete={deleteExpense}
                showCategory={false}
              />
              {expenses.length > 5 && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Showing 5 of {expenses.length} entries
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                <p className="text-sm text-gray-600 mt-1">Manage your categories and settings</p>
              </div>
              <Link
                to="/categories"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Manage Categories
              </Link>
            </div>
          </Card>
        </div>

        {/* Export Section */}
        <div className="mt-6">
          <ExportPanel />
        </div>
      </div>
    </FeatureErrorBoundary>
  )
}
