// EditTransactionModal.tsx
import React from "react"

const EditTransactionModal: React.FC<{
  transaction: any
  setTransaction: (transaction: any) => void
  handleEditTransaction: () => void
  closeModal: () => void
  budgets: { id: string; name: string }[]
}> = ({
  transaction,
  setTransaction,
  handleEditTransaction,
  closeModal,
  budgets,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
        <input
          type="date"
          className="border rounded-md w-full p-2 mb-4"
          value={transaction.transactiondate}
          onChange={e =>
            setTransaction({ ...transaction, transactiondate: e.target.value })
          }
        />
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Category"
          value={transaction.category}
          onChange={e =>
            setTransaction({ ...transaction, category: e.target.value })
          }
        />
        <input
          type="number"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Amount"
          value={transaction.amount}
          onChange={e =>
            setTransaction({
              ...transaction,
              amount: parseFloat(e.target.value),
            })
          }
        />
        <input
          type="text"
          className="border rounded-md w-full p-2 mb-4"
          placeholder="Description"
          value={transaction.description}
          onChange={e =>
            setTransaction({ ...transaction, description: e.target.value })
          }
        />
        <select
          className="border rounded-md w-full p-2 mb-4"
          value={transaction.type}
          onChange={e =>
            setTransaction({ ...transaction, type: e.target.value })
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {transaction.type === "expense" && (
          <select
            className="border rounded-md w-full p-2 mb-4"
            value={transaction.budget_id || ""}
            onChange={e =>
              setTransaction({ ...transaction, budget_id: e.target.value })
            }
          >
            <option
              value=""
              disabled
            >
              Select Budget
            </option>
            {budgets.map(budget => (
              <option
                key={budget.id}
                value={budget.id}
              >
                {budget.name}
              </option>
            ))}
          </select>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleEditTransaction}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTransactionModal
