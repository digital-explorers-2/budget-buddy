"use client"

import * as React from "react"

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

export function Dashboard() {
  const [showExpenseModal, setShowExpenseModal] = React.useState(false)
  const [showIncomeModal, setShowIncomeModal] = React.useState(false)

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

  return (
    <div className="h-full w-full">
      <div className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-6 py-8 p-4">
          <p className="text-3xl font-bold">Hello, "Username"!</p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-emerald-500 hover:bg-emerald-700"
              onClick={openIncomeModal}
            >
              New Income
            </Button>

            <Button
              variant="outline"
              className="bg-rose-800 hover:bg-rose-700"
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
                  "w-[300px] justify-start hover:bg-gray-200 text-left font-normal",
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
              className="w-auto p-0"
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
        <div className="relative flex w-full flex-wrap  gap-2 md:flex-nowrap">
          <Card className="w-full h-25">
            <CardContent className="flex w-full items-center h-25 gap-2 pt-4">
              <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
              <div>
                <span>Income</span>
                <p>0,00 $</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex w-full h-25 items-center gap-2 pt-4">
              <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
              <div>
                <span>Expense</span>
                <p>0,00 $</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent className="flex w-full h-25 items-center gap-2 pt-4">
              <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
              <div>
                <span>Balance</span>
                <p>0,00 $</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
          <Card className="w-full h-80">
            <CardHeader>
              <CardTitle>Income by category</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No data for the selected period</p>
              <p>Try selecting a different period or adding new transactions</p>
            </CardContent>
          </Card>
          <Card className="w-full h-80">
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
        <Card className="flex items-center gap-4 p-2">
          <CardContent className="w-full h-full">
            <Tabs
              defaultValue="account"
              className="w-full h-80"
            >
              <TabsList className="grid w-[200px] grid-cols-2 bg-gray-200">
                <TabsTrigger value="year">Year</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              <TabsContent
                value="year"
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
    </div>
  )
}
