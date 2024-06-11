import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { createClient } from "@supabase/supabase-js"
import { useUser } from "@/hooks/UserContext" // Assuming you have a useUser hook

// Retrieve and ensure the environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Anon Key")
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface StatesProps {
  isOpen: boolean
  onClose: () => void
}

export function ExpenseTransaction({ isOpen, onClose }: StatesProps) {
  const { user } = useUser() // Fetch the user context
  const [transactiondate, setDate] = React.useState<Date>(new Date()) // Initialize with current date
  const [amount, setAmount] = React.useState<number>()
  const [category, setCategory] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")
  const [budgetId, setBudgetId] = React.useState<string>("")
  const [budgets, setBudgets] = React.useState<{ id: string; name: string }[]>(
    [],
  )
  const [isBudgetModalOpen, setIsBudgetModalOpen] = React.useState(false)
  const [newBudgetName, setNewBudgetName] = React.useState("")
  const [newBudgetAmount, setNewBudgetAmount] = React.useState<number>(0)
  const [currencies, setCurrencies] = React.useState<
    { id: string; code: string }[]
  >([])
  const [selectedCurrencyId, setSelectedCurrencyId] = React.useState<string>("")

  React.useEffect(() => {
    async function fetchBudgets() {
      const { data, error } = await supabase.from("budget").select("id, name")
      if (error) {
        console.error("Error fetching budgets:", error)
      } else {
        setBudgets(data)
      }
    }

    async function fetchCurrencies() {
      const { data, error } = await supabase.from("currency").select("id, code")
      if (error) {
        console.error("Error fetching currencies:", error)
      } else {
        setCurrencies(data)
      }
    }

    fetchBudgets()
    fetchCurrencies()
  }, [])

  const handleCreateBudget = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newBudgetName.trim() === "" || newBudgetAmount <= 0) {
      alert("Budget name and amount cannot be empty or zero")
      return
    }

    if (!user) {
      alert("User not authenticated")
      return
    }

    try {
      const { data, error } = await supabase
        .from("budget")
        .insert([
          {
            name: newBudgetName,
            totalamount: newBudgetAmount,
            user_id: user.id, // Ensure `user.id` is available in your component
            createddate: new Date().toISOString(),
            currency_id: selectedCurrencyId,
          },
        ])
        .select()

      if (error) {
        console.error("Error creating budget:", error)
        alert(`Failed to create budget: ${error.message}`)
      } else if (data && data.length > 0) {
        console.log("Budget created successfully:", data)
        setBudgets([...budgets, { id: data[0].id, name: newBudgetName }])
        setNewBudgetName("")
        setNewBudgetAmount(0)
        setIsBudgetModalOpen(false)
        setBudgetId(data[0].id)
      } else {
        console.error("Unexpected error: No data returned after insert")
        alert("Unexpected error: No data returned after insert")
      }
    } catch (error) {
      console.error("Unexpected error creating budget:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const type = "expense"

    const { data, error } = await supabase
      .from("transaction1") // table name
      .insert([
        {
          description,
          amount,
          category,
          transactiondate: transactiondate
            ? transactiondate.toISOString()
            : null,
          type,
          budget_id: budgetId,
        },
      ])

    if (error) {
      console.error("Error inserting data:", error)
    } else {
      console.log("Data inserted successfully:", data)
      // Reset form fields
      setDescription("")
      setAmount(0)
      setCategory("")
      setBudgetId("")
      setDate(new Date()) // Reset to current date
      onClose()
    }
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={onClose}
      >
        <DialogContent className="w-full max-w-[500px] bg-white dark:bg-gray-900 border-2 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>Create a new expense transaction</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="e.g., Monthly rent payment, Grocery shopping"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={e => setAmount(parseFloat(e.target.value))}
                  min="0"
                  placeholder="0"
                  className="mt-1 block w-full rounded-md dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="category">Expense Category</Label>
                <Input
                  id="category"
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="e.g., Groceries, Rent, Utilities"
                  className="dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="budget">Budget</Label>
                <div className="flex items-center space-x-2">
                  <select
                    id="budget"
                    value={budgetId}
                    onChange={e => setBudgetId(e.target.value)}
                    className="border rounded-md w-full p-2 mb-4 dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                  >
                    <option value="">Select a budget</option>
                    {budgets.map(budget => (
                      <option
                        key={budget.id}
                        value={budget.id}
                      >
                        {budget.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    onClick={() => setIsBudgetModalOpen(true)}
                    className="dark:bg-slate-700 hover:dark:bg-slate-800"
                  >
                    New Budget
                  </Button>
                </div>
                <Label htmlFor="transactiondate">Transaction Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-2 dark:border-slate-800",
                        !transactiondate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {transactiondate ? (
                        format(transactiondate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-2 dark:border-slate-800">
                    <Calendar
                      mode="single"
                      selected={transactiondate}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                className="dark:bg-slate-700 hover:dark:bg-slate-800"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="dark:bg-slate-50 hover:dark:bg-slate-200 dark:text-black"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isBudgetModalOpen}
        onOpenChange={setIsBudgetModalOpen}
      >
        <DialogContent className="w-full max-w-[500px] bg-white dark:bg-gray-900 border-2 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>Create a new budget</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateBudget}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newBudgetName">Budget Name</Label>
                <Input
                  id="newBudgetName"
                  type="text"
                  placeholder="e.g., Monthly Expenses, Travel Fund"
                  value={newBudgetName}
                  onChange={e => setNewBudgetName(e.target.value)}
                  className="dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="newBudgetAmount">Budget Amount</Label>
                <Input
                  id="newBudgetAmount"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 500"
                  value={newBudgetAmount}
                  onChange={e => setNewBudgetAmount(parseFloat(e.target.value))}
                  min="0"
                  className="mt-1 block w-full rounded-md dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                />
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  value={selectedCurrencyId}
                  onChange={e => setSelectedCurrencyId(e.target.value)}
                  className="border rounded-md w-full p-2 mb-4 dark:bg-gray-900 border-2 dark:border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 placeholder-gray-500"
                >
                  <option value="">Select a currency</option>
                  {currencies.map(currency => (
                    <option
                      key={currency.id}
                      value={currency.id}
                    >
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                className="dark:bg-slate-700 hover:dark:bg-slate-800"
                onClick={() => setIsBudgetModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="dark:bg-slate-50 hover:dark:bg-slate-200 dark:text-black"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
