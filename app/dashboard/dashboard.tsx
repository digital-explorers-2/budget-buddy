"use client"

import * as React from "react"
import "../globals.css"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TrendingDown, TrendingUp, Wallet } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"

import { IncomeTransaction } from "@/components/income-modal/IncomeTransaction"
import { ExpenseTransaction } from "@/components/expense-modal/ExpenseTransction"
import { useUser } from "@/hooks/UserContext"
import { supabase } from "@/lib/supabaseClient"

export function Dashboard() {
  const [showExpenseModal, setShowExpenseModal] = React.useState(false)
  const [showIncomeModal, setShowIncomeModal] = React.useState(false)
  const [income, setIncome] = React.useState(0)
  const [expense, setExpense] = React.useState(0)
  const { user } = useUser()

  const openExpenseModal = () => {
    setShowExpenseModal(true)
  }

  const closeExpenseModal = () => {
    setShowExpenseModal(false)
  }

  const openIncomeModal = () => {
    setShowIncomeModal(true)
  }

  const closeIncomeModal = () => {
    setShowIncomeModal(false)
  }

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 5, 2),
    to: addDays(new Date(2024, 5, 2), 20),
  })

  const fetchTransactions = async () => {
    const { data: incomeData, error: incomeError } = await supabase
      .from("transaction1")
      .select("amount")
      .eq("type", "income")

    const { data: expenseData, error: expenseError } = await supabase
      .from("transaction1")
      .select("amount")
      .eq("type", "expense")

    if (incomeError || expenseError) {
      console.error("Error fetching transactions:", incomeError || expenseError)
    } else {
      const totalIncome = incomeData.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      )
      const totalExpense = expenseData.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      )
      setIncome(totalIncome)
      setExpense(totalExpense)
    }
  }

  fetchTransactions()

  const balance = income - expense

  return (
    <div className="h-full w-full ">
      <div>
        <div className="flex flex-wrap border-2 border-slate-800 items-center justify-between gap-6 py-8 p-4 ">
          <p className="text-3xl font-bold">Hello, {user?.email}!</p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-2 border-green-500 bg-emerald-800 hover:bg-emerald-700"
              onClick={openIncomeModal}
            >
              New Income
            </Button>

            <Button
              variant="outline"
              className="border-2 border-red-500 bg-rose-800 hover:bg-rose-700"
              onClick={openExpenseModal}
            >
              New Expense
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 py-6 p-4">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start border-2 border-slate-800 hover:bg-gray-800 text-left font-normal",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-gray-900 border-2 border-slate-800"
              align="start"
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className=" flex w-full flex-col gap-2 p-4">
        <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
          <Card className="w-full h-25 border-2 border-slate-800">
            <CardContent className="flex w-full items-center h-25 gap-2 pt-4">
              <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
              <div>
                <span>Income</span>
                <p>{income.toFixed(2)} $</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full border-2 border-slate-800">
            <CardContent className="flex w-full h-25 items-center gap-2 pt-4">
              <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
              <div>
                <span>Expense</span>
                <p>{expense.toFixed(2)} $</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full border-2 border-slate-800">
            <CardContent className="flex w-full h-25 items-center gap-2 pt-4">
              <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
              <div>
                <span>Balance</span>
                <p>{balance.toFixed(2)} $</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
          <Card className="w-full h-80 border-2 border-slate-800">
            <CardHeader>
              <CardTitle>Income by category</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No data for the selected period</p>
              <p>Try selecting a different period or adding new transactions</p>
            </CardContent>
          </Card>
          <Card className="w-full h-80 border-2 border-slate-800">
            <CardHeader>
              <CardTitle>Expenses By Category</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No data for the selected period</p>
              <p>Try selecting a different period or adding new transactions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-3xl font-bold">History</h2>
        <Card className="flex items-center gap-4 p-2 border-2 border-slate-800">
          <CardContent className="w-full h-full">
            <Tabs
              defaultValue="year"
              className="w-full h-80"
            >
              <TabsList className="grid w-[200px] grid-cols-2 bg-gray-800 gap-1">
                <TabsTrigger
                  className="hover:bg-black rounded"
                  value="year"
                >
                  Year
                </TabsTrigger>
                <TabsTrigger
                  className="hover:bg-black rounded"
                  value="month"
                >
                  Month
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="year"
                className="w-full h-full"
              >
                <Card className="flex h-60 items-center border-2 border-slate-800">
                  <CardContent>
                    <p>No data for the selected period</p>
                    <p>
                      Try selecting a different period or adding new
                      transactions
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="month"
                className="w-full h-full"
              >
                <Card className="flex h-60 items-center">
                  <CardContent>
                    <p>No data for the selected period</p>
                    <p>
                      Try selecting a different period or adding new
                      transactions
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <IncomeTransaction
        isOpen={showIncomeModal}
        onClose={closeIncomeModal}
      />
      <ExpenseTransaction
        isOpen={showExpenseModal}
        onClose={closeExpenseModal}
      />
    </div>
  )
}
