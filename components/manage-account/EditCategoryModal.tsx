// EditCategoryModal.tsx
import React from "react"

const EditCategoryModal: React.FC<{
  closeModal: () => void
  editCategoryName: string
  setEditCategoryName: (name: string) => void
  handleEditCategory: () => void
  categoryType: "income" | "expense"
}> = ({
  closeModal,
  editCategoryName,
  setEditCategoryName,
  handleEditCategory,
  categoryType,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          Edit {categoryType === "income" ? "Income" : "Expense"} Category
        </h2>
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Category Name"
          value={editCategoryName}
          onChange={e => setEditCategoryName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleEditCategory}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCategoryModal
