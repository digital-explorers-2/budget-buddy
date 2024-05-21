import type { NextApiRequest, NextApiResponse } from 'next';



const transactions: Transaction[] = [
  { id: 1, description: 'Groceries', date: '2024-05-01', type: 'Expense', amount: 50 },
  { id: 2, description: 'Salary', date: '2024-05-05', type: 'Income', amount: 5000 },
  { id: 3, description: 'Rent', date: '2024-05-10', type: 'Expense', amount: 1200 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Transaction[]>) {
  res.status(200).json(transactions);
}
