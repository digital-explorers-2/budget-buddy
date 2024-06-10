"use client" // Add this line at the top of the file

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { FaPlus, FaTrash } from "react-icons/fa"
import { supabase } from "@/lib/supabaseClient" // Adjust the import based on your project structure

console.log("Supabase Client:", supabase)



const ManageAccount: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [categoryType, setCategoryType] = useState<"income" | "expense" | null>(
    null,
  )
  const [newCategoryName, setNewCategoryName] = useState("")
  const [incomeCategories, setIncomeCategories] = useState<string[]>([])
  const [expenseCategories, setExpenseCategories] = useState<string[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user...")
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error("Error fetching user:", error)
        setError(`Error fetching user: ${error.message}`)
        setLoading(false)
        router.push("/login") // Redirect to login page if there's an error
      } else if (!data.user) {
        console.log("No user found, redirecting to login.")
        router.push("/login") // Redirect to login page if no user is found
      } else {
        console.log("User fetched successfully:", data.user)
        setUser(data.user)
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  useEffect(() => {
    if (user) {
      fetchCategories()
    }
  }, [user])

  const fetchCategories = async () => {
    console.log("Fetching categories for user:", user.id)
    try {
      const { data, error } = await supabase
        .from("category")
        .select("name, type")
        .eq("user_id", user.id)

      if (error) {
        console.error("Error fetching categories:", error)
        setError(`Error fetching categories: ${error.message}`)
      } else {
        console.log("Categories fetched successfully:", data)
        const income = data.filter(
          (category: { type: string }) => category.type === "income",
        )
        const expense = data.filter(
          (category: { type: string }) => category.type === "expense",
        )
        setIncomeCategories(
          income.map((category: { name: string }) => category.name),
        )
        setExpenseCategories(
          expense.map((category: { name: string }) => category.name),
        )
      }
    } catch (error: any) {
      console.error("Unexpected error fetching categories:", error)
      setError("Unexpected error fetching categories")
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
        .insert([
          { name: newCategoryName, type: categoryType, user_id: user.id },
        ])

      if (error) {
        console.error("Error creating category:", error)
        alert(`Failed to create category: ${error.message}`)
      } else {
        console.log("Category created successfully:", data)
        if (categoryType === "income") {
          setIncomeCategories([...incomeCategories, newCategoryName])
        } else {
          setExpenseCategories([...expenseCategories, newCategoryName])
        }
        closeModal()
      }
    } catch (error: any) {
      console.error("Unexpected error creating category:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
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

          <div className="mb-12 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Currency</h2>
            <label
              className="block font-medium mb-2"
              htmlFor="currency"
            >
              Change currency here:
            </label>
            <select
              id="currency"
              className="border rounded-md w-full p-2 mb-4"
            >
              <option value="dollar">$Dollar</option>
              <option value="euro">€Euro</option>
              <option value="yen">¥Yen</option>
              <option value="pound">£Pound</option>
            </select>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Confirm Currency
            </button>
          </div>

          {sections.map(section => (
            <div
              key={section.title}
              className="mb-12 bg-white shadow-md rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-0">{section.title}</h2>
                <button
                  onClick={() => openModal(section.type)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2"
                >
                  <FaPlus /> Create New Category
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {section.categories.map(category => (
                  <div
                    key={category}
                    className="bg-gray-200 p-4 rounded-md flex justify-center items-center"
                  >
                    <span>{category}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-6 mt-2">
                {section.categories.map(category => (
                  <div
                    key={`${category}-delete`}
                    className="flex justify-center"
                  >
                    <button className="text-red-500 flex items-center gap-2">
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
    </div>
  )
}

interface Section {
  title: string
  type: "income" | "expense"
  categories: string[]
}

const CreateCategoryModal: React.FC<{
  closeModal: () => void
  newCategoryName: string
  setNewCategoryName: (name: string) => void
  handleCreateCategory: () => void
  categoryType: "income" | "expense"
}> = ({
  closeModal,
  newCategoryName,
  setNewCategoryName,
  handleCreateCategory,
  categoryType,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Create New {categoryType === "income" ? "Income" : "Expense"} Category
        </h2>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Category Name"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateCategory}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageAccount