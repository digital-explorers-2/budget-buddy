import React from 'react';

const ManageAccount: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Manage Account</h1>
          <div className="flex items-center">
            <button className="mr-4">Dark/Light Mode settings</button>
            <button className="flex items-center">
              <span>Profile</span>
              <img src="/path-to-profile-icon.png" alt="Profile Icon" className="ml-2 w-6 h-6" />
            </button>
          </div>
        </header>
        <nav className="flex mb-8 space-x-4">
          <a href="/dashboard" className="text-blue-500 hover:underline">Dashboard</a>
          <a href="/transactions" className="text-blue-500 hover:underline">Transactions</a>
          <a href="/manage-profile" className="text-blue-500 hover:underline">Manage Profile</a>
        </nav>
        <section>
          <div className="mb-8">
            <label className="block font-medium mb-2" htmlFor="currency">Currency</label>
            <input id="currency" className="border rounded-md w-full p-2 mb-4" type="text" placeholder="$Dollar, €Euro, £Pound..." />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Confirm Currency</button>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Income Categories</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-200 p-4 rounded-md">Category 1</div>
              <div className="bg-gray-200 p-4 rounded-md">Category 2</div>
              <div className="bg-gray-200 p-4 rounded-md">Category 3</div>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">Create New Category</button>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Expenses Categories</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-200 p-4 rounded-md">Category 1</div>
              <div className="bg-gray-200 p-4 rounded-md">Category 2</div>
              <div className="bg-gray-200 p-4 rounded-md">Category 3</div>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-md">Create New Category</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageAccount;
