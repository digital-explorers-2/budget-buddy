"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"

const Transactions: FC = () => {
  // Define the JSON array directly in the component
  const transactions: Transaction[] = [
    {
      id: 1,
      description: "Groceries",
      date: "2024-05-01",
      type: "Expense",
      amount: 50,
    },
    {
      id: 2,
      description: "Salary",
      date: "2024-05-05",
      type: "Income",
      amount: 5000,
    },
    {
      id: 3,
      description: "Rent",
      date: "2024-05-10",
      type: "Expense",
      amount: 1200,
    },
    // Add more transactions as needed
  ]

  return (
    <div className="flex flex-col min-h-screen w-full  ">
      <main className="flex flex-col flex-1 p-4 w-full">
        <h1 className="text-2xl mb-4">Transactions History</h1>
        <div className="flex justify-between mb-4">
          <Button
            variant="outline"
            className="border-gray-400"
          >
            + Category
          </Button>
          <Button
            variant="outline"
            className="border-gray-400"
          >
            + Type
          </Button>
          <Button
            variant="outline"
            className="bg-blue-500 text-white"
          >
            Export as CSV
          </Button>
        </div>
        <Table className="bg-white w-full text-black">
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}

export default Transactions
