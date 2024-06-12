"use client"

import * as React from "react"
import "../globals.css"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { TrendingDown, TrendingUp, Wallet } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Period, Timeframe } from "@/types"
import { IncomeTransaction } from "@/components/income-modal/IncomeTransaction"
import { ExpenseTransaction } from "@/components/expense-modal/ExpenseTransction"
import { useUser } from "@/hooks/UserContext"
import { supabase } from "@/lib/supabaseClient"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface Props {
  period: Period
  setPeriod: (period: Period) => void
  timeframe: Timeframe
  setTimeframe: (timeframe: Timeframe) => void
}

export function Dashboard({
  period,
  setPeriod,
  timeframe,
  setTimeframe,
}: Props) {
  const [showExpenseModal, setShowExpenseModal] = React.useState(false)
  const [showIncomeModal, setShowIncomeModal] = React.useState(false)
  const [incomeCategories, setIncomeCategories] = React.useState<{
    [key: string]: number
  }>({})
  const [expenseCategories, setExpenseCategories] = React.useState<{
    [key: string]: number
  }>({})
  const [newtimeframe, setNewTimeframe] = React.useState<Timeframe>("month")
  const [newPeriod, setNewPeriod] = React.useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  const [income, setIncome] = React.useState(0)
  const [expense, setExpense] = React.useState(0)
  const { user } = useUser()
  const [activeTab, setActiveTab] = React.useState("year")
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 5, 2),
    to: addDays(new Date(2024, 5, 2), 20),
  })
  const [currencySymbol, setCurrencySymbol] = React.useState<string>("$") // Default symbol

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

  React.useEffect(() => {
    if (user) {
      fetchUserCurrencySymbol()
    }
  }, [user])

  const fetchUserCurrencySymbol = async () => {
    if (!user) return

    const { data: userProfile, error: userProfileError } = await supabase
      .from("user_profiles")
      .select("preferred_currency")
      .eq("user_id", user.id)
      .single()

    if (userProfileError) {
      console.error("Error fetching user profile:", userProfileError)
      return
    }

    const preferredCurrencyCode = userProfile.preferred_currency

    const { data: currencyData, error: currencyError } = await supabase
      .from("currency")
      .select("symbols")
      .eq("code", preferredCurrencyCode)
      .single()

    if (currencyError) {
      console.error("Error fetching currency data:", currencyError)
    } else {
      setCurrencySymbol(currencyData.symbols)
    }
  }

  const fetchTransactions = async () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1

    const endDate = new Date(currentYear, currentMonth, 0)
    const lastDayOfMonth = endDate.getDate()

    const startDate = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-01`
    const endDateString = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${lastDayOfMonth.toString().padStart(2, "0")}`

    const { data: incomeData, error: incomeError } = await supabase
      .from("transaction1")
      .select("amount, category, transactiondate")
      .eq("type", "income")
      .gte("transactiondate", startDate) // Greater than or equal to the start of the month
      .lte("transactiondate", endDateString) // Less than or equal to the end of the month

    const { data: expenseData, error: expenseError } = await supabase
      .from("transaction1")
      .select("amount, category, transactiondate")
      .eq("type", "expense")
      .gte("transactiondate", startDate) // Greater than or equal to the start of the month
      .lte("transactiondate", endDateString) // Less than or equal to the end of the month

    if (incomeError || expenseError) {
      console.error("Error fetching transactions:", incomeError || expenseError)
    } else {
      setIncome(
        incomeData.reduce((acc, transaction) => acc + transaction.amount, 0),
      )
      setExpense(
        expenseData.reduce((acc, transaction) => acc + transaction.amount, 0),
      )

      const incomeByCategory = incomeData.reduce(
        (acc: { [key: string]: number }, transaction) => {
          if (!acc[transaction.category]) acc[transaction.category] = 0
          acc[transaction.category] += transaction.amount
          return acc
        },
        {},
      )

      const expenseByCategory = expenseData.reduce(
        (acc: { [key: string]: number }, transaction) => {
          if (!acc[transaction.category]) acc[transaction.category] = 0
          acc[transaction.category] += transaction.amount
          return acc
        },
        {},
      )

      setIncomeCategories(incomeByCategory)
      setExpenseCategories(expenseByCategory)
    }
  }

  React.useEffect(() => {
    fetchTransactions()
  }, [])

  const balance = income - expense
  const totalIncome = Object.values(incomeCategories).reduce(
    (acc, amount) => acc + amount,
    0,
  )

  const chartdata = [
    {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      //expense: expense,
      //income: income,
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
      expense: expense,
      income: income,
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
    {
      month: new Date().getMonth(),
    },
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayTickFormatter = (tick: number): string => {
    return tick.toString().padStart(2, "0")
  }

  const totalExpense = Object.values(expenseCategories).reduce(
    (acc, amount) => acc + amount,
    0,
  )

  return (
    <div className="h-full w-full ">
      <div>
        <div className="flex flex-wrap border-b dark:border-slate-800 items-center justify-between gap-6 py-8 p-4 ">
          <p className="text-3xl font-bold">Hello, {user?.email}!</p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="text-white border-2 border-green-500 bg-emerald-800 hover:bg-emerald-700"
              onClick={openIncomeModal}
            >
              New Income
            </Button>

            <Button
              variant="outline"
              className="text-white border-2 border-red-500 bg-rose-800 hover:bg-rose-700"
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
                  "w-[300px] justify-start border-2 dark:border-slate-800 hover:bg-gray-200 hover:dark:bg-gray-800 text-left font-normal",
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
              className="w-auto p-0 bg-white dark:bg-gray-900 border-2 dark:border-slate-800"
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
          <Card className="w-full h-25 border-2 dark:border-slate-800">
            <CardContent className="flex w-full items-center h-25 gap-2 pt-4">
              <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-500 bg-emerald-400/10" />
              <div>
                <span>Income</span>
                <p>
                  {income.toFixed(2)} {currencySymbol}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full border-2 dark:border-slate-800">
            <CardContent className="flex w-full h-25 items-center gap-2 pt-4">
              <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-red-500 bg-red-400/10" />
              <div>
                <span>Expense</span>
                <p>
                  {expense.toFixed(2)} {currencySymbol}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full border-2 dark:border-slate-800">
            <CardContent className="flex w-full h-25 items-center gap-2 pt-4">
              <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-violet-500 bg-violet-400/10" />
              <div>
                <span>Balance</span>
                <p>
                  {balance.toFixed(2)} {currencySymbol}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap w-full gap-2 md:flex-nowrap">
          <Card className="w-full h-80 border-2 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Income by category</CardTitle>
            </CardHeader>
            <CardContent
              className="overflow-auto scrollbar"
              style={{ maxHeight: "200px" }}
            >
              {Object.keys(incomeCategories).length > 0 ? (
                Object.entries(incomeCategories)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => (
                    <div
                      key={category}
                      className="mb-4"
                    >
                      <div className="flex justify-between mb-1">
                        <span>
                          {category} (
                          {((amount / totalIncome) * 100).toFixed(0)}%)
                        </span>
                        <span>
                          {amount.toFixed(2)} {currencySymbol}
                        </span>
                      </div>
                      <Progress
                        data-value={(amount / totalIncome) * 100}
                        className="w-full bg-red-500"
                        style={{ width: `${(amount / totalIncome) * 100}%` }}
                      />
                    </div>
                  ))
              ) : (
                <>
                  <p>No data for the selected period</p>
                  <p>
                    Try selecting a different period or adding new transactions
                  </p>
                </>
              )}
            </CardContent>
          </Card>
          <Card className="w-full h-80 border-2 dark:border-slate-800 ">
            <CardHeader>
              <CardTitle>Expenses By Category</CardTitle>
            </CardHeader>
            <CardContent
              className="overflow-auto scrollbar"
              style={{ maxHeight: "200px" }}
            >
              {Object.keys(expenseCategories).length > 0 ? (
                Object.entries(expenseCategories)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, amount]) => (
                    <div
                      key={category}
                      className="mb-4"
                    >
                      <div className="flex justify-between mb-1">
                        <span>
                          {category} (
                          {((amount / totalExpense) * 100).toFixed(0)}%)
                        </span>
                        <span>
                          {amount.toFixed(2)} {currencySymbol}
                        </span>
                      </div>
                      <Progress
                        data-value={(amount / totalExpense) * 100}
                        className="w-full bg-emerald-500"
                        style={{ width: `${(amount / totalExpense) * 100}%` }}
                      />
                    </div>
                  ))
              ) : (
                <>
                  <p>No data for the selected period</p>
                  <p>
                    Try selecting a different period or adding new transactions
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-3xl font-bold">History</h2>
        <Card className="flex items-center gap-4 p-2 border-2 dark:border-slate-800">
          <CardContent className="w-full h-full">
            <Tabs
              value={newtimeframe}
              //defaultValue="year"
              className="w-full h-80"
              //onValueChange={setActiveTab}
              onValueChange={value => setNewTimeframe(value as Timeframe)}
            >
              <div className="flex flex-col space-y-1.5 p-5 gap-2">
                <div className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
                  <div className="flex flex-wrap items-center gap-4">
                    <TabsList className="grid w-[200px] grid-cols-2 bg-slate-200 dark:bg-gray-800 gap-1">
                      <TabsTrigger
                        className="hover:bg-white hover:dark:bg-black rounded data-[state=active]:bg-white rounded data-[state=active]:dark:bg-black"
                        value="year"
                      >
                        Year
                      </TabsTrigger>
                      <TabsTrigger
                        className="hover:bg-white hover:dark:bg-black rounded data-[state=active]:bg-white rounded data-[state=active]:dark:bg-black"
                        value="month"
                      >
                        Month
                      </TabsTrigger>
                    </TabsList>

                    <Select>
                      <SelectTrigger className="w-[100px] dark:bg-gray-900 border-2 dark:border-slate-800">
                        <SelectValue placeholder="2024" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-900 border-2 dark:border-slate-800">
                        <SelectGroup>
                          <SelectItem value="year">2024</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {newtimeframe === "month" && (
                      <Select>
                        <SelectTrigger className="w-[100px] dark:bg-gray-900 border-2 dark:border-slate-800">
                          <SelectValue placeholder="January" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-900 border-2 dark:border-slate-800">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => {
                            const monthStr = new Date(
                              newPeriod.year,
                              month,
                              1,
                            ).toLocaleString("default", { month: "long" })

                            return (
                              <SelectItem
                                key={month}
                                value={month.toString()}
                              >
                                {monthStr}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="flex h-10 gap-2">
                    <Badge
                      variant="outline"
                      className="flex gap-2 dark:bg-gray-900 border-2 dark:border-slate-800 text-sm"
                    >
                      <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                      Income
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex gap-2 dark:bg-gray-900 border-2 dark:border-slate-800 text-sm"
                    >
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                      Expense
                    </Badge>
                  </div>
                </div>
              </div>

              <TabsContent
                value="year"
                className="w-full h-full"
              >
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart
                    height={300}
                    data={chartdata}
                    barCategoryGap={5}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      strokeOpacity={"0.2"}
                      vertical={false}
                    />
                    <XAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={tick => months[tick]}
                      axisLine={false}
                      padding={{ left: 5, right: 5 }}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar
                      dataKey="income"
                      label="Income"
                      fill="#059669"
                      radius={4}
                      className="cursor-pointer"
                    />
                    <Bar
                      dataKey="expense"
                      label="Expense"
                      fill="#EF4444"
                      radius={4}
                      className="cursor-pointer"
                    />
                    <Tooltip cursor={{ opacity: 0.1 }} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent
                value="month"
                className="w-full h-full"
              >
                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart
                    height={300}
                    data={chartdata}
                    barCategoryGap={5}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      strokeOpacity={"0.2"}
                      vertical={false}
                    />
                    <XAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={dayTickFormatter}
                      axisLine={false}
                      padding={{ left: 5, right: 5 }}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Bar
                      dataKey="income"
                      label="Income"
                      fill="#059669"
                      radius={4}
                      className="cursor-pointer"
                    />
                    <Bar
                      dataKey="expense"
                      label="Expense"
                      fill="#EF4444"
                      radius={4}
                      className="cursor-pointer"
                    />
                    <Tooltip cursor={{ opacity: 0.1 }} />
                  </BarChart>
                </ResponsiveContainer>
                <></>
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
