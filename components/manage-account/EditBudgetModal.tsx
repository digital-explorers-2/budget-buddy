// EditBudgetModal.tsx
import React from "react"

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
          onChange={e =>
            setBudget({ ...budget, totalamount: parseFloat(e.target.value) })
          }
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleEditBudget}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditBudgetModal
