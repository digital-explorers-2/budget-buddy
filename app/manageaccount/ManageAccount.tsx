"use client"
import React, { useState, useEffect } from "react"
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/hooks/UserContext"

console.log("Supabase Client:", supabase)

const ManageAccount: React.FC = () => {
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryType, setCategoryType] = useState<"income" | "expense" | null>(null)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [incomeCategories, setIncomeCategories] = useState<{ id: number; name: string }[]>([])
  const [expenseCategories, setExpenseCategories] = useState<{ id: number; name: string }[]>([])
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null)
  const [editCategoryName, setEditCategoryName] = useState("")
  const [currencies, setCurrencies] = useState<{ id: string; code: string; name: string }[]>([])
  const [selectedCurrency, setSelectedCurrency] = useState<string>("")
  const [budgets, setBudgets] = useState<{ id: string; name: string; totalamount: number; createddate: string; currency_id: string }[]>([])
  const [newBudgetName, setNewBudgetName] = useState("")
  const [newBudgetAmount, setNewBudgetAmount] = useState<number>(0)
  const [transactions, setTransactions] = useState<any[]>([])
  const [editTransaction, setEditTransaction] = useState<any | null>(null)
  const [editBudget, setEditBudget] = useState<any | null>(null)

  useEffect(() => {
    if (user) {
      fetchCategories()
      fetchCurrencies()
      fetchBudgets()
      fetchTransactions()
    }
  }, [user])

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("transaction1").select("id, category, type")
    if (error) {
      console.error("Error fetching categories:", error)
    } else {
      const income = data.filter((category: { type: string }) => category.type === "income")
      const expense = data.filter((category: { type: string }) => category.type === "expense")
      setIncomeCategories(income.map((category: { id: number; category: string }) => ({ id: category.id, name: category.category })))
      setExpenseCategories(expense.map((category: { id: number; category: string }) => ({ id: category.id, name: category.category })))
    }
  }

  const fetchCurrencies = async () => {
    const { data, error } = await supabase.from("currency").select("id, code, name")
    if (error) {
      console.error("Error fetching currencies:", error)
    } else {
      setCurrencies(data)
    }
  }

  const fetchBudgets = async () => {
    const { data, error } = await supabase.from("budget").select("id, name, totalamount, createddate, currency_id")
    if (error) {
      console.error("Error fetching budgets:", error)
    } else {
      setBudgets(data)
    }
  }

  const fetchTransactions = async () => {
    const { data, error } = await supabase.from("transaction1").select("*")
    if (error) {
      console.error("Error fetching transactions:", error)
    } else {
      setTransactions(data)
    }
  }

  const openModal = (type: "income" | "expense") => {
    setCategoryType(type)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCategoryType(null)
    setNewCategoryName("")
  }

  const handleCreateCategory = async () => {
    if (newCategoryName.trim() === "") {
      alert("Category name cannot be empty")
      return
    }

    try {
      const { data, error } = await supabase.from("category").insert([{ name: newCategoryName, type: categoryType }])

      if (error) {
        console.error("Error creating category:", error)
        alert(`Failed to create category: ${error.message}`)
      } else {
        console.log("Category created successfully:", data)
        if (categoryType === "income") {
          setIncomeCategories([...incomeCategories, { id: data[0].id, name: newCategoryName }])
        } else {
          setExpenseCategories([...expenseCategories, { id: data[0].id, name: newCategoryName }])
        }
        closeModal()
      }
    } catch (error) {
      console.error("Unexpected error creating category:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const handleDeleteCategory = async (categoryId: number, type: "income" | "expense") => {
    try {
      const { data, error } = await supabase.from("transaction1").delete().eq("id", categoryId).eq("type", type)

      if (error) {
        console.error("Error deleting category:", error)
        alert(`Failed to delete category: ${error.message}`)
      } else {
        console.log("Category deleted successfully:", data)
        if (type === "income") {
          setIncomeCategories(incomeCategories.filter(cat => cat.id !== categoryId))
        } else {
          setExpenseCategories(expenseCategories.filter(cat => cat.id !== categoryId))
        }
        fetchTransactions() // Refresh transactions after delete
      }
    } catch (error) {
      console.error("Unexpected error deleting category:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const handleEditCategory = async () => {
    if (editCategoryName.trim() === "") {
      alert("Category name cannot be empty")
      return
    }

    try {
      const { data, error } = await supabase.from("transaction1").update({ category: editCategoryName }).eq("id", editCategoryId)

      if (error) {
        console.error("Error updating category:", error)
        alert(`Failed to update category: ${error.message}`)
      } else {
        console.log("Category updated successfully:", data)
        if (categoryType === "income") {
          setIncomeCategories(incomeCategories.map(cat => (cat.id === editCategoryId ? { ...cat, name: editCategoryName } : cat)))
        } else {
          setExpenseCategories(expenseCategories.map(cat => (cat.id === editCategoryId ? { ...cat, name: editCategoryName } : cat)))
        }
        setEditCategoryId(null)
        setEditCategoryName("")
        fetchTransactions() // Refresh transactions after edit
      }
    } catch (error) {
      console.error("Unexpected error updating category:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const openEditModal = (id: number, name: string, type: "income" | "expense") => {
    setEditCategoryId(id)
    setEditCategoryName(name)
    setCategoryType(type)
  }

  const handleConfirmCurrency = async () => {
    if (!user) {
      alert("User not authenticated")
      return
    }

    try {
      const { data, error } = await supabase.from("user_profiles").update({ preferred_currency: selectedCurrency }).eq("user_id", user.id)

      if (error) {
        console.error("Error updating preferred currency:", error)
        alert(`Failed to update currency: ${error.message}`)
      } else {
        alert("Preferred currency updated successfully")
      }
    } catch (error) {
      console.error("Unexpected error updating currency:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const handleCreateBudget = async () => {
   if (newBudgetName.trim() === "" || newBudgetAmount <= 0) {
     alert("Budget name and amount cannot be empty or zero")
     return
   }

    try {
      const { data: currencyData, error: currencyError } = await supabase.from("currency").select("id").eq("code", selectedCurrency).single()

      if (currencyError || !currencyData) {
        console.error("Error fetching currency ID:", currencyError)
        alert(`Failed to fetch currency ID: ${currencyError?.message || "Unknown error"}`)
        return
      }

      const currencyId = currencyData.id

      const { data, error } = await supabase.from("budget").insert([
        {
          name: newBudgetName,
          totalamount: newBudgetAmount,
          user_id: user.id,
          createddate: new Date().toISOString(),
          currency_id: currencyId,
        },
      ]).select()

      if (error) {
        console.error("Error creating budget:", error)
        alert(`Failed to create budget: ${error.message}`)
      } else if (data && data.length > 0) {
        console.log("Budget created successfully:", data)
        setBudgets([...budgets, { id: data[0].id, name: newBudgetName, totalamount: newBudgetAmount, createddate: data[0].createddate, currency_id: currencyId }])
        setNewBudgetName("")
        setNewBudgetAmount(0)
      } else {
        console.error("Unexpected error: No data returned after insert")
        alert("Unexpected error: No data returned after insert")
      }
    } catch (error) {
      console.error("Unexpected error creating budget:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const handleDeleteBudget = async (budgetId: string) => {
    try {
      const { data, error } = await supabase.from("budget").delete().eq("id", budgetId)

      if (error) {
        console.error("Error deleting budget:", error)
        alert(`Failed to delete budget: ${error.message}`)
      } else {
        console.log("Budget deleted successfully:", data)
        setBudgets(budgets.filter(budget => budget.id !== budgetId))
      }
    } catch (error) {
      console.error("Unexpected error deleting budget:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const handleEditBudget = async () => {
    if (!editBudget) return

    try {
      const { data, error } = await supabase.from("budget").update(editBudget).eq("id", editBudget.id)

      if (error) {
        console.error("Error updating budget:", error)
        alert(`Failed to update budget: ${error.message}`)
      } else {
        console.log("Budget updated successfully:", data)
        setBudgets(budgets.map(budget => (budget.id === editBudget.id ? editBudget : budget)))
        setEditBudget(null)
      }
    } catch (error) {
      console.error("Unexpected error updating budget:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const openEditBudgetModal = (budget: any) => {
    setEditBudget(budget)
  }

  const handleEditTransaction = async () => {
    if (!editTransaction) return

    try {
      const { data, error } = await supabase.from("transaction1").update(editTransaction).eq("id", editTransaction.id)

      if (error) {
        console.error("Error updating transaction:", error)
        alert(`Failed to update transaction: ${error.message}`)
      } else {
        console.log("Transaction updated successfully:", data)
        setTransactions(transactions.map(tx => (tx.id === editTransaction.id ? editTransaction : tx)))
        setEditTransaction(null)
      }
    } catch (error) {
      console.error("Unexpected error updating transaction:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  const openEditTransactionModal = (transaction: any) => {
    setEditTransaction(transaction)
  }

  if (!user) {
    return <p>You need to be logged in to view this page.</p>
  }

  const getCurrencySymbol = (currencyId: string) => {
    const currency = currencies.find(curr => curr.id === currencyId)
    return currency ? currency.code : ""
  }

  const sections: Section[] = [
    {
      title: "Income Categories",
      type: "income",
      categories: incomeCategories,
    },
    {
      title: "Expenses Categories",
      type: "expense",
      categories: expenseCategories,
    },
  ]

  return (
    <div className="w-full text-black">
      <div className="flex min-h-screen p-8">
        <div className="w-full max-w-[800px] bg-gray p-6 mx-auto">
          <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Manage Account</h1>

          <div className="mb-12 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Currency</h2>
            <label className="block font-medium mb-2" htmlFor="currency">
              Change currency here:
            </label>
            <select
              id="currency"
              className="border rounded-md w-full p-2 mb-4"
              value={selectedCurrency}
              onChange={e => setSelectedCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
            </select>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleConfirmCurrency}>
              Confirm Currency
            </button>
          </div>

          <div className="mb-12 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Budgets</h2>
            <label className="block font-medium mb-2" htmlFor="budget-name">
              Budget Name
            </label>
            <input
              id="budget-name"
              className="border rounded-md w-full p-2 mb-4"
              value={newBudgetName}
              onChange={e => setNewBudgetName(e.target.value)}
              placeholder="Enter budget name"
            />
            <label className="block font-medium mb-2" htmlFor="budget-amount">
              Budget Amount
            </label>
            <input
              id="budget-amount"
              type="number"
              className="border rounded-md w-full p-2 mb-4"
              value={newBudgetAmount}
              onChange={e => setNewBudgetAmount(parseFloat(e.target.value))}
              placeholder="Enter budget amount"
            />
            <button className="px-4 py-2 bg-green-500 text-white rounded-md mb-4" onClick={handleCreateBudget}>
              Create Budget
            </button>
            <div>
              {budgets.map(budget => (
                <div key={budget.id} className="flex justify-between items-center mb-2">
                  <span>
                    {budget.name}: {getCurrencySymbol(budget.currency_id)} {budget.totalamount.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-blue-500 flex items-center gap-2" onClick={() => openEditBudgetModal(budget)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="text-red-500 flex items-center gap-2" onClick={() => handleDeleteBudget(budget.id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {sections.map(section => (
            <div key={section.title} className="mb-12 bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-0">{section.title}</h2>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {section.categories.map(category => (
                  <div key={category.id} className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6 mt-2">
                {section.categories.map(category => (
                  <div key={`${category.id}-actions`} className="flex justify-center">
                    <button
                      className="text-blue-500 flex items-center gap-2 mt-2"
                      onClick={() => openEditTransactionModal(transactions.find(tx => tx.category === category.name))}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button className="text-red-500 flex items-center gap-2" onClick={() => handleDeleteCategory(category.id, section.type)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && categoryType && (
        <CreateCategoryModal
          closeModal={closeModal}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          handleCreateCategory={handleCreateCategory}
          categoryType={categoryType}
        />
      )}

      {editCategoryId && (
        <EditCategoryModal
          closeModal={() => setEditCategoryId(null)}
          editCategoryName={editCategoryName}
          setEditCategoryName={setEditCategoryName}
          handleEditCategory={handleEditCategory}
          categoryType={categoryType!}
        />
      )}

      {editTransaction && (
        <EditTransactionModal
          transaction={editTransaction}
          setTransaction={setEditTransaction}
          handleEditTransaction={handleEditTransaction}
          closeModal={() => setEditTransaction(null)}
          budgets={budgets}
        />
      )}

      {editBudget && (
        <EditBudgetModal
          budget={editBudget}
          setBudget={setEditBudget}
          handleEditBudget={handleEditBudget}
          closeModal={() => setEditBudget(null)}
        />
      )}
    </div>
  )
}

interface Section {
  title: string
  type: "income" | "expense"
  categories: { id: number; name: string }[]
}

const CreateCategoryModal: React.FC<{
  closeModal: () => void
  newCategoryName: string
  setNewCategoryName: (name: string) => void
  handleCreateCategory: () => void
  categoryType: "income" | "expense"
}> = ({ closeModal, newCategoryName, setNewCategoryName, handleCreateCategory, categoryType }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create New {categoryType === "income" ? "Income" : "Expense"} Category</h2>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleCreateCategory} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

const EditCategoryModal: React.FC<{
  closeModal: () => void
  editCategoryName: string
  setEditCategoryName: (name: string) => void
  handleEditCategory: () => void
  categoryType: "income" | "expense"
}> = ({ closeModal, editCategoryName, setEditCategoryName, handleEditCategory, categoryType }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit {categoryType === "income" ? "Income" : "Expense"} Category</h2>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Category Name"
          value={editCategoryName}
          onChange={e => setEditCategoryName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleEditCategory} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

const EditTransactionModal: React.FC<{
  transaction: any
  setTransaction: (transaction: any) => void
  handleEditTransaction: () => void
  closeModal: () => void
  budgets: { id: string; name: string }[]
}> = ({ transaction, setTransaction, handleEditTransaction, closeModal, budgets }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
        <input
          type="date"
          className="border rounded-md w-full p-2 mb-4"
          value={transaction.transactiondate}
          onChange={e => setTransaction({ ...transaction, transactiondate: e.target.value })}
        />
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Category"
          value={transaction.category}
          onChange={e => setTransaction({ ...transaction, category: e.target.value })}
        />
        <input
          type="number"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Amount"
          value={transaction.amount}
          onChange={e => setTransaction({ ...transaction, amount: parseFloat(e.target.value) })}
        />
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Description"
          value={transaction.description}
          onChange={e => setTransaction({ ...transaction, description: e.target.value })}
        />
        <select
          className="border rounded-md w-full p-2 mb-4"
          value={transaction.type}
          onChange={e => setTransaction({ ...transaction, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {transaction.type === "expense" && (
          <select
            className="border rounded-md w-full p-2 mb-4"
            value={transaction.budget_id || ""}
            onChange={e => setTransaction({ ...transaction, budget_id: e.target.value })}
          >
            <option value="" disabled>Select Budget</option>
            {budgets.map(budget => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>
        )}
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleEditTransaction} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

const EditBudgetModal: React.FC<{
  budget: any
  setBudget: (budget: any) => void
  handleEditBudget: () => void
  closeModal: () => void
}> = ({ budget, setBudget, handleEditBudget, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Budget</h2>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Budget Name"
          value={budget.name}
          onChange={e => setBudget({ ...budget, name: e.target.value })}
        />
        <input
          type="number"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Budget Amount"
          value={budget.totalamount}
          onChange={e => setBudget({ ...budget, totalamount: parseFloat(e.target.value) })}
        />
        <div className="flex justify-end gap-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">
            Cancel
          </button>
          <button onClick={handleEditBudget} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageAccount

    




