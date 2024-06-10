"use client"

import { FC, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js"// Adjust the import according to your file structure
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

interface Transaction {
  id: number;
  description: string;
  transactiondate: string;
  type: string;
  amount: number;
  category: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase URL or Anon Key")
}

const supabase = createClient(supabaseUrl, supabaseKey)

const Transactions: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transaction1')
        .select('*');

      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        setTransactions(data);
      }

      setLoading(false);
    };

    fetchTransactions();
  }, []);

  // Function to convert transactions to CSV
  const exportToCSV = () => {
    const headers = ["Description", "Date", "Type", "Amount", "Category"];
    const rows = transactions.map(transaction => [
      transaction.description,
      transaction.transactiondate,
      transaction.type,
      transaction.amount,
      transaction.category
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") 
      + "\n" 
      + rows.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    // Filter transactions based on selected category and type
    const filteredTransactions = transactions.filter(transaction => {
      const categoryMatch = !filterCategory || transaction.category === filterCategory;
      const typeMatch = !filterType || transaction.type === filterType;
      return categoryMatch && typeMatch;
    });

    // Get unique categories and types for the dropdowns
  const uniqueCategories = [...new Set(transactions.map(transaction => transaction.category))];
  const uniqueTypes = [...new Set(transactions.map(transaction => transaction.type))];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900 text-white">
      <main className="flex flex-col flex-1 p-4 w-full">
        <h1 className="text-2xl mb-4">Transactions History</h1>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <label htmlFor="category" className="mr-2">Category:</label>
            <select
              id="category"
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="bg-gray-800 text-white p-2 mr-4"
            >
              <option value="">All</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <label htmlFor="type" className="mr-2">Type:</label>
            <select
              id="type"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-gray-800 text-white p-2"
            >
              <option value="">All</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <Button
            variant="outline"
            className="bg-blue-500 text-white"
            onClick={exportToCSV}
          >
            Export as CSV
          </Button>
        </div>
        <Table className="bg-gray-800 w-full text-white">
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : transactions.length > 0 ? (
              transactions.map(transaction => (
                <TableRow key={transaction.id} className="bg-gray-700 hover:bg-gray-600">
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.transactiondate}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">No transactions found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
};

export default Transactions;

