"use client"
import React, { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/hooks/UserContext"
import CreateCategoryModal from "@/components/manage-account/CreateCategoryModal"
import EditCategoryModal from "@/components/manage-account/EditCategoryModal"
import EditTransactionModal from "@/components/manage-account/EditTransactionModal"
import EditBudgetModal from "@/components/manage-account/EditBudgetModal"
import BudgetList from "@/components/manage-account/BudgetList"
import CategoryList from "@/components/manage-account/CategoryList"
import CurrencySelector from "@/components/manage-account/CurrencySelector"

const ManageAccount: React.FC = () => {
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryType, setCategoryType] = useState<"income" | "expense" | null>(
    null,
  )
  const [newCategoryName, setNewCategoryName] = useState("")
  const [incomeCategories, setIncomeCategories] = useState<
    { id: number; name: string }[]
  >([])
  const [expenseCategories, setExpenseCategories] = useState<
    { id: number; name: string }[]
  >([])
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null)
  const [editCategoryName, setEditCategoryName] = useState("")
  const [currencies, setCurrencies] = useState<
    { id: string; symbols: string; name: string; exchangerate: number }[]
  >([])
  const [selectedCurrency, setSelectedCurrency] = useState<string>("")
  const [selectedExchangeRate, setSelectedExchangeRate] = useState<number>(1)
  const [budgets, setBudgets] = useState<
    {
      id: string
      name: string
      totalamount: number
      createddate: string
      currency_id: string
    }[]
  >([])
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
    const { data, error } = await supabase
      .from("transaction1")
      .select("id, category, type")
    if (error) {
      console.error("Error fetching categories:", error)
    } else {
      const income = data.filter(
        (category: { type: string }) => category.type === "income",
      )
      const expense = data.filter(
        (category: { type: string }) => category.type === "expense",
      )
      setIncomeCategories(
        income.map((category: { id: number; category: string }) => ({
          id: category.id,
          name: category.category,
        })),
      )
      setExpenseCategories(
        expense.map((category: { id: number; category: string }) => ({
          id: category.id,
          name: category.category,
        })),
      )
    }
  }

  const fetchCurrencies = async () => {
    const { data, error } = await supabase
      .from("currency")
      .select("id, symbols, name, exchangerate")
    if (error) {
      console.error("Error fetching currencies:", error)
    } else {
      setCurrencies(data)
    }
  }

  const fetchBudgets = async () => {
    const { data, error } = await supabase
      .from("budget")
      .select("id, name, totalamount, createddate, currency_id")
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
      const { data, error } = await supabase
        .from("category")
        .insert([{ name: newCategoryName, type: categoryType }])

      if (error) {
        console.error("Error creating category:", error)
        alert(`Failed to create category: ${error.message}`)
      } else {
        console.log("Category created successfully:", data)
        if (categoryType === "income") {
          setIncomeCategories([
            ...incomeCategories,
            { id: data[0].id, name: newCategoryName },
          ])
        } else {
          setExpenseCategories([
            ...expenseCategories,
            { id: data[0].id, name: newCategoryName },
          ])
        }
        closeModal()
      }
    } catch (error) {
      console.error("Unexpected error creating category:", error)
    }
  }

  const handleDeleteCategory = async (
    categoryId: number,
    type: "income" | "expense",
  ) => {
    try {
      const { data, error } = await supabase
        .from("transaction1")
        .delete()
        .eq("id", categoryId)
        .eq("type", type)

      if (error) {
        console.error("Error deleting category:", error)
        alert(`Failed to delete category: ${error.message}`)
      } else {
        console.log("Category deleted successfully:", data)
        if (type === "income") {
          setIncomeCategories(
            incomeCategories.filter(cat => cat.id !== categoryId),
          )
        } else {
          setExpenseCategories(
            expenseCategories.filter(cat => cat.id !== categoryId),
          )
        }
        fetchTransactions() // Refresh transactions after delete
      }
    } catch (error) {
      console.error("Unexpected error deleting category:", error)
    }
  }

  const handleEditCategory = async () => {
    if (editCategoryName.trim() === "") {
      alert("Category name cannot be empty")
      return
    }

    try {
      const { data, error } = await supabase
        .from("transaction1")
        .update({ category: editCategoryName })
        .eq("id", editCategoryId)

      if (error) {
        console.error("Error updating category:", error)
        alert(`Failed to update category: ${error.message}`)
      } else {
        console.log("Category updated successfully:", data)
        if (categoryType === "income") {
          setIncomeCategories(
            incomeCategories.map(cat =>
              cat.id === editCategoryId
                ? { ...cat, name: editCategoryName }
                : cat,
            ),
          )
        } else {
          setExpenseCategories(
            expenseCategories.map(cat =>
              cat.id === editCategoryId
                ? { ...cat, name: editCategoryName }
                : cat,
            ),
          )
        }
        setEditCategoryId(null)
        setEditCategoryName("")
        fetchTransactions() // Refresh transactions after edit
      }
    } catch (error) {
      console.error("Unexpected error updating category:", error)
    }
  }

  const openEditModal = (
    id: number,
    name: string,
    type: "income" | "expense",
  ) => {
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
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ preferred_currency: selectedCurrency })
        .eq("user_id", user.id)

      if (error) {
        console.error("Error updating preferred currency:", error)
        alert(`Failed to update currency: ${error.message}`)
      } else {
        alert("Preferred currency updated successfully")
        const selectedCurrencyData = currencies.find(
          currency => currency.symbols === selectedCurrency,
        )
        if (selectedCurrencyData) {
          setSelectedExchangeRate(selectedCurrencyData.exchangerate)
          updateBudgetsAndTransactions(selectedCurrencyData.exchangerate)
        }
      }
    } catch (error) {
      console.error("Unexpected error updating currency:", error)
    }
  }

  const updateBudgetsAndTransactions = (exchangeRate: number) => {
    setBudgets(
      budgets.map(budget => ({
        ...budget,
        totalamount: budget.totalamount * exchangeRate,
      })),
    )

    setTransactions(
      transactions.map(transaction => ({
        ...transaction,
        amount: transaction.amount * exchangeRate,
      })),
    )
  }

  const convertAmount = (amount: number, currencyId: string) => {
    const currency = currencies.find(curr => curr.id === currencyId)
    if (!currency) return amount
    return (amount / currency.exchangerate) * selectedExchangeRate
  }

  const handleCreateBudget = async () => {
    if (newBudgetName.trim() === "" || newBudgetAmount <= 0) {
      alert("Budget name and amount cannot be empty or zero")
      return
    }

    try {
      const { data: currencyData, error: currencyError } = await supabase
        .from("currency")
        .select("id")
        .eq("symbols", selectedCurrency)
        .single()

      if (currencyError || !currencyData) {
        console.error("Error fetching currency ID:", currencyError)
        alert(
          `Failed to fetch currency ID: ${currencyError?.message || "Unknown error"}`,
        )
        return
      }

      const currencyId = currencyData.id

      const { data, error } = await supabase
        .from("budget")
        .insert([
          {
            name: newBudgetName,
            totalamount: newBudgetAmount,
            user_id: user.id,
            createddate: new Date().toISOString(),
            currency_id: currencyId,
          },
        ])
        .select()

      if (error) {
        console.error("Error creating budget:", error)
        alert(`Failed to create budget: ${error.message}`)
      } else if (data && data.length > 0) {
        console.log("Budget created successfully:", data)
        setBudgets([
          ...budgets,
          {
            id: data[0].id,
            name: newBudgetName,
            totalamount: newBudgetAmount,
            createddate: data[0].createddate,
            currency_id: currencyId,
          },
        ])
        setNewBudgetName("")
        setNewBudgetAmount(0)
        fetchBudgets() // Refresh budgets after creation
      } else {
        console.error("Unexpected error: No data returned after insert")
        alert("Unexpected error: No data returned after insert")
      }
    } catch (error) {
      console.error("Unexpected error creating budget:", error)
    }
  }

  const handleDeleteBudget = async (budgetId: string) => {
    try {
      const { data, error } = await supabase
        .from("budget")
        .delete()
        .eq("id", budgetId)

      if (error) {
        console.error("Error deleting budget:", error)
        alert(`Failed to delete budget: ${error.message}`)
      } else {
        console.log("Budget deleted successfully:", data)
        setBudgets(budgets.filter(budget => budget.id !== budgetId))
        fetchBudgets() // Refresh budgets after deletion
      }
    } catch (error) {
      console.error("Unexpected error deleting budget:", error)
    }
  }

  const handleEditBudget = async () => {
    if (!editBudget) return

    try {
      const { data, error } = await supabase
        .from("budget")
        .update(editBudget)
        .eq("id", editBudget.id)

      if (error) {
        console.error("Error updating budget:", error)
        alert(`Failed to update budget: ${error.message}`)
      } else {
        console.log("Budget updated successfully:", data)
        setBudgets(
          budgets.map(budget =>
            budget.id === editBudget.id ? editBudget : budget,
          ),
        )
        setEditBudget(null)
        fetchBudgets() // Refresh budgets after update
      }
    } catch (error) {
      console.error("Unexpected error updating budget:", error)
    }
  }

  const openEditBudgetModal = (budget: any) => {
    setEditBudget(budget)
  }

  const handleEditTransaction = async () => {
    if (!editTransaction) return

    try {
      const { data, error } = await supabase
        .from("transaction1")
        .update(editTransaction)
        .eq("id", editTransaction.id)

      if (error) {
        console.error("Error updating transaction:", error)
        alert(`Failed to update transaction: ${error.message}`)
      } else {
        console.log("Transaction updated successfully:", data)
        setTransactions(
          transactions.map(tx =>
            tx.id === editTransaction.id ? editTransaction : tx,
          ),
        )
        setEditTransaction(null)
        fetchTransactions() // Refresh transactions after update
      }
    } catch (error) {
      console.error("Unexpected error updating transaction:", error)
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
    return currency ? currency.symbols : ""
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
          <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">
            Manage Account
          </h1>

          <CurrencySelector
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            handleConfirmCurrency={handleConfirmCurrency}
          />

          <BudgetList
            budgets={budgets}
            getCurrencySymbol={getCurrencySymbol}
            convertAmount={convertAmount}
            openEditBudgetModal={openEditBudgetModal}
            handleDeleteBudget={handleDeleteBudget}
            newBudgetName={newBudgetName}
            setNewBudgetName={setNewBudgetName}
            newBudgetAmount={newBudgetAmount}
            setNewBudgetAmount={setNewBudgetAmount}
            handleCreateBudget={handleCreateBudget}
            selectedExchangeRate={selectedExchangeRate}
          />

          {sections.map(section => (
            <CategoryList
              key={section.title}
              title={section.title}
              categories={section.categories}
              openEditTransactionModal={openEditTransactionModal}
              handleDeleteCategory={handleDeleteCategory}
              sectionType={section.type}
              transactions={transactions}
            />
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

export default ManageAccount
