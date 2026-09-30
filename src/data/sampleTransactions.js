function daysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(12, 0, 0, 0)
  return date
}

export const initialBudget = 3000

export const sampleTransactions = [
  { id: 't1', description: 'Whole Foods Groceries', category: 'Groceries', date: daysAgo(0), amount: 124.5 },
  { id: 't2', description: 'Starbucks Coffee', category: 'Dining', date: daysAgo(0), amount: 6.8 },
  { id: 't3', description: 'Office Supplies', category: 'Office', date: daysAgo(0), amount: 38.25 },
  { id: 't4', description: 'Monthly Office Rent', category: 'Rent & Utilities', date: daysAgo(1), amount: 1200 },
  { id: 't5', description: 'Uber Ride', category: 'Transport', date: daysAgo(1), amount: 18.4 },
  { id: 't6', description: 'AWS Cloud Hosting', category: 'Utilities', date: daysAgo(2), amount: 84.2 },
  { id: 't7', description: 'Gym Membership', category: 'Lifestyle', date: daysAgo(2), amount: 45 },
  { id: 't8', description: 'Sunday Brunch', category: 'Dining', date: daysAgo(3), amount: 32.9 },
  { id: 't9', description: 'Weekend Coffee', category: 'Dining', date: daysAgo(4), amount: 5.6 },
  { id: 't10', description: 'Team Lunch', category: 'Dining', date: daysAgo(5), amount: 24 },
]
