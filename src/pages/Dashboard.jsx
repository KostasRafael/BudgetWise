import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar/Navbar.jsx'
import UserProfile from '../components/UserProfile/UserProfile.jsx'
import Button from '../components/Button/Button.jsx'
import BudgetForm from '../components/BudgetForm/BudgetForm.jsx'
import ExpenseForm from '../components/ExpenseForm/ExpenseForm.jsx'
import MetricCard from '../components/MetricCard/MetricCard.jsx'
import RecentDays from '../components/RecentDays/RecentDays.jsx'
import { createTransaction, deleteTransaction, fetchTransactions, updateTransaction } from '../api/transactions.js'
import { clearSession, getCurrentUser, logout } from '../api/auth.js'
import { fetchBudget, saveBudget, toMonthKey } from '../api/budgets.js'
import { formatCurrency } from '../utils/format.js'
import { toDateInputValue } from '../utils/dates.js'
import { downloadCsv } from '../utils/exportCsv.js'
import profileAvatar from '../assets/avatars/profile.png'
import './Dashboard.css'

// A single expense above this share of the budget is highlighted in red.
const LARGE_EXPENSE_SHARE = 0.2

const monthLabelFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })

export default function Dashboard() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  // The budget belongs to the calendar month the dashboard was opened in.
  const [month] = useState(() => toMonthKey())
  const [budget, setBudget] = useState(0)
  const [transactions, setTransactions] = useState([])
  // 'loading' until the first fetch finishes, then 'ready' or 'failed'.
  const [loadState, setLoadState] = useState('loading')
  const [loadError, setLoadError] = useState(null)
  const [error, setError] = useState(null)
  const [expenseDate, setExpenseDate] = useState(() => toDateInputValue(new Date()))
  const [expenseFocusRequest, setExpenseFocusRequest] = useState(0)

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // Still leave the dashboard; the local session is already cleared.
    }
    navigate('/login', { replace: true })
  }

  // A 401 means the JWT cookie is missing, expired or invalid: send the user back to log in.
  function handleApiError(err, message) {
    if (err.status === 401) {
      clearSession()
      navigate('/login', { replace: true, state: { sessionExpired: true } })
      return
    }
    setError(`${message} ${err.message}`)
  }

  async function loadDashboard(signal) {
    try {
      const [monthBudget, expenses] = await Promise.all([
        fetchBudget(month, { signal }),
        fetchTransactions({ signal }),
      ])
      setBudget(monthBudget)
      setTransactions(expenses)
      setLoadState('ready')
    } catch (err) {
      if (err.name === 'AbortError') return
      if (err.status === 401) return handleApiError(err)
      setLoadError(err.message)
      setLoadState('failed')
    }
  }

  function handleRetryLoad() {
    setLoadState('loading')
    loadDashboard()
  }

  // Fetch this month's budget and the user's expenses every time the dashboard mounts (including page reloads).
  useEffect(() => {
    const controller = new AbortController()
    loadDashboard(controller.signal)
    return () => controller.abort()
    // loadDashboard only uses stable state, setters and navigate.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Runs a change against the API, then re-fetches so the UI matches the server exactly.
  async function saveAndRefresh(action, failureMessage) {
    try {
      await action()
      setTransactions(await fetchTransactions())
      setError(null)
    } catch (err) {
      handleApiError(err, failureMessage)
    }
  }

  async function handleSetBudget(amount) {
    try {
      setBudget(await saveBudget(month, amount))
      setError(null)
    } catch (err) {
      handleApiError(err, "Couldn't save budget.")
    }
  }

  // Totals compare this month's spending against this month's budget.
  const monthTransactions = transactions.filter((t) => toMonthKey(t.date) === month)
  const totalSpent = monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const remaining = budget - totalSpent
  const spentShare = budget > 0 ? (totalSpent / budget) * 100 : 0
  const overBudget = remaining < 0
  const monthLabel = monthLabelFormatter.format(new Date(`${month}-01T12:00:00`))
  const categories = [...new Set(transactions.map((t) => t.category).filter(Boolean))].sort()

  function handleAddExpense(expense) {
    return saveAndRefresh(() => createTransaction(expense), "Couldn't add expense.")
  }

  function handleAddForDay(day) {
    setExpenseDate(toDateInputValue(day))
    setExpenseFocusRequest((n) => n + 1)
  }

  function handleUpdate(id, updates) {
    return saveAndRefresh(() => updateTransaction(id, updates), "Couldn't save changes.")
  }

  function handleDelete(id) {
    return saveAndRefresh(() => deleteTransaction(id), "Couldn't delete expense.")
  }

  function handleExport() {
    downloadCsv('budgetwise-ledger.csv', [
      ['Description', 'Category', 'Date', 'Amount'],
      ...transactions.map((t) => [t.description, t.category, toDateInputValue(t.date), t.amount.toFixed(2)]),
    ])
  }

  return (
    <div className="dashboard">
      <Navbar>
        <UserProfile
          name={user?.name ?? user?.email ?? 'My Account'}
          tier="Premium Tier"
          avatar={profileAvatar}
          settingsTo="/settings"
        />
        <Button variant="subtle" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </Navbar>

      <main className="dashboard__workspace">
        <aside className="dashboard__controls">
          {/* Keyed on the budget so the input resets to the value fetched or saved on the server. */}
          <BudgetForm
            key={budget}
            budget={budget}
            monthLabel={monthLabel}
            disabled={loadState !== 'ready'}
            onSetBudget={handleSetBudget}
          />
          <ExpenseForm
            date={expenseDate}
            onDateChange={setExpenseDate}
            focusRequest={expenseFocusRequest}
            categories={categories}
            onAddExpense={handleAddExpense}
          />
        </aside>

        <section className="dashboard__metrics">
          {loadState === 'loading' && (
            <p className="dashboard__status" role="status">
              Loading your budget and expenses…
            </p>
          )}

          {loadState === 'failed' && (
            <div className="dashboard__status dashboard__status--error dashboard__status--action" role="alert">
              <span>Couldn't load your dashboard. {loadError}</span>
              <Button variant="soft-danger" size="tiny" onClick={handleRetryLoad}>
                Try Again
              </Button>
            </div>
          )}

          {/* Totals and daily cards are only built from a successful fetch, never from placeholder data. */}
          {loadState === 'ready' && (
            <>
              {error && (
                <p className="dashboard__status dashboard__status--error" role="alert">
                  {error}
                </p>
              )}

              <div className="dashboard__metric-row">
                <MetricCard
                  label="Total Budget"
                  value={formatCurrency(budget)}
                  tag={budget > 0 ? monthLabel : 'Not set for this month'}
                />
                <MetricCard
                  label="Total Spent"
                  value={formatCurrency(totalSpent)}
                  tag={`${spentShare.toFixed(1)}% of limit`}
                  tagTone="danger"
                />
                <MetricCard
                  label="Remaining Balance"
                  value={formatCurrency(remaining)}
                  valueTone={overBudget ? 'danger' : 'success'}
                  tag={overBudget ? 'Over Budget' : 'Healthy State'}
                  tagTone={overBudget ? 'danger' : 'success'}
                />
              </div>

              <RecentDays
                transactions={transactions}
                isLarge={(t) => budget > 0 && t.amount > budget * LARGE_EXPENSE_SHARE}
                onAddForDay={handleAddForDay}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onExport={handleExport}
              />
            </>
          )}
        </section>
      </main>
    </div>
  )
}
