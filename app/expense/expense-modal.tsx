"use client";
import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

const ExpenseModal: React.FC = () => {
  const methods = useForm();
  const { handleSubmit, control } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Create a new <span className="text-red-500">expense</span> transaction
            </h2>
            <button className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    id="description"
                    {...field}
                    placeholder="Transaction description (optional)"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                )}
              />
              <p className="text-sm text-gray-500">Transaction description (optional)</p>
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="number"
                    id="amount"
                    {...field}
                    placeholder="0"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                )}
              />
              <p className="text-sm text-gray-500">Transaction amount (required)</p>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select
                    id="category"
                    {...field}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="" disabled>Select category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                )}
              />
              <p className="text-sm text-gray-500">Select a category for this transaction</p>
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Transaction date</label>
              <Controller
                name="date"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="date"
                    id="date"
                    {...field}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                )}
              />
              <p className="text-sm text-gray-500">Select a date for this transaction</p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => console.log('Cancel')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default ExpenseModal;
