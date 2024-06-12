declare namespace JSX {
  interface IntrinsicElements {
    pre: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
  }
}

type ExpenseFormData = {
  description: string
  amount: number
}

interface Category {
  id: number
  name: string
}

interface Currency {
  id: number
  name: string
}

type Transaction = {
  id: number
  description: string
  date: string
  type: string
  amount: number
  category: string
}

interface StatesProps {
  isOpen: boolean
  onClose: () => void
}

export type TransactionType = "income" | "expense";
export type Timeframe = "month" | "year";
export type Period = { year: number; month: number };
