declare namespace JSX {
    interface IntrinsicElements {
      pre: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
    }
  }
  
  type Transaction = {
    id: number;
    description: string;
    date: string;
    type: string;
    amount: number;
};