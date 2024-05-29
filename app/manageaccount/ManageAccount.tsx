import React from "react"

const ManageAccount: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-[800px]bg-gray p-6  mx-auto">
          <h1 className="text-3xl font-bold mb-8">Manage Account</h1>

          <div className="mb-12 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Currency</h2>
          <label className="block font-medium mb-2" htmlFor="currency">
            Change currency here:
          </label>
          <select id="currency" className="border rounded-md w-full p-2 mb-4">
            <option value="dollar">$Dollar</option>
            <option value="euro">€Euro</option>
            <option value="yen">¥Yen</option>
            <option value="pound">£Pound</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Confirm Currency
          </button>
        </div>

          <section>
          <div className="mb-12 bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-0">Income Categories</h2>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md">Create New Category</button>
              </div>
              <div className="bg-gray-200 p-4 rounded-md flex justify-between items-center">
                <span>Category 2</span>
                <button className="text-red-500">Delete</button>
                <button className="text-red-500">Delete</button>
              </div>
            </div>

            <div className="mb-12 bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-0">Expenses Categories</h2>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md">Create New Category</button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                  <span>Category 1</span>
                </div>
                <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                  <span>Category 2</span>
                </div>
                <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                  <span>Category 3</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-2">
                <button className="text-red-500">Delete</button>
                <button className="text-red-500">Delete</button>
                <button className="text-red-500">Delete</button>
              </div>
            </div>


            <div className="mb-12 bg-white shadow-md rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold mb-0">Expenses Categories</h2>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md">Create New Category</button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                  <span>Category 1</span>
                </div>
                <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                  <span>Category 2</span>
                </div>
                <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
                  <span>Category 3</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-2">
                <button className="text-red-500">Delete</button>
                <button className="text-red-500">Delete</button>
                <button className="text-red-500">Delete</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ManageAccount

