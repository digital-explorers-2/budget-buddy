import React, { useState, useEffect } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/hooks/UserContext"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const BudgetList: React.FC<{
  budgets: {
    id: string
    name: string
    totalamount: number
    createddate: string
    currency_id: string
  }[]
  getCurrencySymbol: (currencyId: string) => string
  openEditBudgetModal: (budget: any) => void
  handleDeleteBudget: (budgetId: string) => void
  setBudgets: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        name: string
        totalamount: number
        createddate: string
        currency_id: string
      }[]
    >
  >
  selectedExchangeRate: number
  convertAmount: (amount: number, currencyId: string) => number
  primaryCurrency: string
}> = ({
  budgets,
  getCurrencySymbol,
  openEditBudgetModal,
  handleDeleteBudget,
  setBudgets,
  selectedExchangeRate,
  convertAmount,
  primaryCurrency,
}) => {
  const { user } = useUser()
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)
  const [newBudgetName, setNewBudgetName] = useState("")
  const [newBudgetAmount, setNewBudgetAmount] = useState<number>(0)
  const [currencies, setCurrencies] = useState<{ id: string; code: string }[]>(
    [],
  )
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string>("")

  useEffect(() => {
    async function fetchCurrencies() {
      const { data, error } = await supabase.from("currency").select("id, code")
      if (error) {
        console.error("Error fetching currencies:", error)
      } else {
        setCurrencies(data)
      }
    }

    fetchCurrencies()
  }, [])

  const handleCreateBudget = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newBudgetName.trim() === "" || newBudgetAmount <= 0) {
      alert("Budget name and amount cannot be empty or zero")
      return
    }

    if (!user) {
      alert("User not authenticated")
      return
    }

    try {
      const { data, error } = await supabase
        .from("budget")
        .insert([
          {
            name: newBudgetName,
            totalamount: newBudgetAmount,
            userid: user.id,
            createddate: new Date().toISOString(),
            currency_id: selectedCurrencyId,
          },
        ])
        .select()

      if (error) {
        console.error("Error creating budget:", error)
        alert(`Failed to create budget: ${error.message}`)
      } else if (data && data.length > 0) {
        console.log("Budget created successfully:", data)
        setNewBudgetName("")
        setNewBudgetAmount(0)
        setIsBudgetModalOpen(false)
        setSuccessMessage("Budget created successfully!")
        setBudgets([
          ...budgets,
          {
            id: data[0].id,
            name: newBudgetName,
            totalamount: newBudgetAmount,
            createddate: data[0].createddate,
            currency_id: selectedCurrencyId,
          },
        ])
        setTimeout(() => setSuccessMessage(""), 3000) // Clear the message after 3 seconds
      } else {
        console.error("Unexpected error: No data returned after insert")
        alert("Unexpected error: No data returned after insert")
      }
    } catch (error) {
      console.error("Unexpected error creating budget:", error)
    }
  }

  return (
    <div className="mb-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Budgets</h2>
      {successMessage && (
        <div className="mb-4 text-green-500">{successMessage}</div>
      )}
      <Button
        onClick={() => setIsBudgetModalOpen(true)}
        className="mb-4 bg-blue-500 text-white"
      >
        Create New Budget
      </Button>
      <div>
        {budgets.map(budget => (
          <div
            key={budget.id}
            className="flex justify-between items-center mb-2 border-b border-gray-200 py-2"
          >
            <div className="flex flex-col">
              <span className="font-semibold">
                {budget.name}: {getCurrencySymbol(budget.currency_id)}{" "}
                {budget.totalamount.toFixed(2)}
              </span>
              {getCurrencySymbol(budget.currency_id) !== "$" && (
                <span className="text-gray-500 text-sm">
                  (Converted to USD: $
                  {convertAmount(
                    budget.totalamount,
                    budget.currency_id,
                  ).toFixed(2)}
                  )
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="text-blue-500 flex items-center gap-2"
                onClick={() => openEditBudgetModal(budget)}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="text-red-500 flex items-center gap-2"
                onClick={() => handleDeleteBudget(budget.id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={isBudgetModalOpen}
        onOpenChange={setIsBudgetModalOpen}
      >
        <DialogContent className="w-full max-w-[500px] bg-white dark:bg-gray-900 border-2 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>Create a new budget</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateBudget}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newBudgetName">Budget Name</Label>
                <Input
                  id="newBudgetName"
                  type="text"
                  placeholder="e.g., Monthly Expenses, Travel Fund"
                  value={newBudgetName}
                  onChange={e => setNewBudgetName(e.target.value)}
                  className="dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="newBudgetAmount">Budget Amount</Label>
                <Input
                  id="newBudgetAmount"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 500"
                  value={newBudgetAmount}
                  onChange={e => setNewBudgetAmount(parseFloat(e.target.value))}
                  min="0"
                  className="mt-1 block w-full rounded-md dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={selectedCurrencyId}
                  onChange={e => setSelectedCurrencyId(e.target.value)}
                  className="border rounded-md w-full p-2 mb-4 dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                >
                  <option value="">Select a currency</option>
                  {currencies.map(currency => (
                    <option
                      key={currency.id}
                      value={currency.id}
                    >
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                className="dark:bg-slate-700 hover:dark:bg-slate-800"
                onClick={() => setIsBudgetModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="dark:bg-slate-50 hover:dark:bg-slate-200 dark:text-black"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BudgetList
