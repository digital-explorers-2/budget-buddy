declare namespace JSX {
  interface IntrinsicElements {
    pre: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >;
  }
}

type ExpenseFormData = {
  description: string;
  amount: number;
};

interface Category {
  id: number;
  name: string;
}

interface Currency {
  id: number;
  name: string;
}
category: string;
date: string;

type Transaction = {
  id: number
  description: string
  date: string
  type: string
  amount: number
}

interface StatesProps {
  isOpen: boolean
  onClose: () => void;
}
