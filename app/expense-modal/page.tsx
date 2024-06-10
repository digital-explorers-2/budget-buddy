"use client"

import * as React from "react"
import { ExpenseTransaction } from "@/components/expense-modal/ExpenseTransction"



export default function ExpenseModal() {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <ExpenseTransaction isOpen={isOpen} onClose={() => handleOpenChange(false)} />
  )
}
