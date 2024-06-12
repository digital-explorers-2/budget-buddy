import React from "react"
import { FaEdit, FaTrash } from "react-icons/fa"

const CategoryList: React.FC<{
  title: string
  categories: { id: number; name: string }[]
  openEditTransactionModal: (transaction: any) => void
  handleDeleteCategory: (categoryId: number, type: "income" | "expense") => void
  sectionType: "income" | "expense"
  transactions: any[]
}> = ({
  title,
  categories,
  openEditTransactionModal,
  handleDeleteCategory,
  sectionType,
  transactions,
}) => {
  return (
    <div className="mb-12 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold mb-0">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(category => (
          <div
            key={category.id}
            className="bg-gray-200 p-4 rounded-md flex flex-col justify-between items-center"
          >
            <span className="font-medium">{category.name}</span>
            <div className="flex gap-2 mt-2">
              <button
                className="text-blue-500 flex items-center gap-1"
                onClick={() =>
                  openEditTransactionModal(
                    transactions.find(tx => tx.category === category.name),
                  )
                }
              >
                <FaEdit /> Edit
              </button>
              <button
                className="text-red-500 flex items-center gap-1"
                onClick={() => handleDeleteCategory(category.id, sectionType)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList
