"use client"

import ExpenseModal from "./expense-modal"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <ExpenseModal />
    </div>
  )
}
