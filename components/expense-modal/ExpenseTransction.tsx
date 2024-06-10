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
  const [transactiondate, setDate] = React.useState<Date>()
  const [amount, setAmount] = React.useState<number>()
  const [category, setCategory] = React.useState<string>("")
  const [description, setDescription] = React.useState<string>("")

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
      setDate(undefined)
      onClose()
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full max-w-[500px] bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Create a new expense transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="description"
                className="text-white"
              >
                Description
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Transaction description (optional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="bg-gray-700 text-white placeholder-gray-500"
              />
              <Label
                htmlFor="amount"
                className="text-white"
              >
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value))}
                min="0"
                placeholder="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white placeholder-gray-500"
              />
              <Label
                htmlFor="category"
                className="text-white"
              >
                Category
              </Label>
              <Input
                id="category"
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Enter category"
                className="bg-gray-700 text-white placeholder-gray-500"
              />
              <Label
                htmlFor="transactiondate"
                className="text-white"
              >
                Transaction Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal text-white bg-gray-700",
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
                <PopoverContent className="w-auto p-0 bg-gray-800 text-white">
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
              className="bg-gray-200 text-black"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
