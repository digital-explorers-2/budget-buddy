declare namespace JSX {
    interface IntrinsicElements {
      pre: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
    }
  }
  
  type ExpenseFormData = {
    description: string;
    amount: number;
    category: string;
    date: string;
  };