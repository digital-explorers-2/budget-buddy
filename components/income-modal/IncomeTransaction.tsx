"use client"

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
  DialogDescription,
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
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command"
import { supabase } from "@/lib/supabaseClient"

export function IncomeTransaction({ isOpen, onClose }: StatesProps) {
  const [description, setDescription] = React.useState<string>("")
  const [transactiondate, setDate] = React.useState<Date>()
  const [amount, setAmount] = React.useState<number>(0)
  const [category, setCategory] = React.useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const type = "income"

    const { data, error } = await supabase.from("transaction1").insert([
      {
        description,
        amount,
        category,
        transactiondate: transactiondate ? transactiondate.toISOString() : null,
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
      <DialogContent className=" w-full max-w-[500px] bg-gray-900 border-2 border-slate-800">
        <DialogHeader>
          <DialogTitle>Create a new income transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="bg-gray-900 border-2 border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
              />

              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value))}
                min="0"
                className="mt-1 block w-full rounded-md bg-gray-900 border-slate-800 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    type="string"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder=""
                    className="w-full text-left bg-gray-900 border-2 border-slate-800"
                  ></Input>
                  {/* <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left border-2 border-slate-800"
                      >
                        {category ? category : "Select category"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2 bg-gray-900 border-2 border-slate-800">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandItem
                            onSelect={() => setCategory("Create new")}
                          >
                            <Button className="font-medium w-full text-white hover:bg-slate-800 border-b border-slate-800 ">
                              Create new
                            </Button>
                          </CommandItem>
                          <CommandItem
                            disabled
                            className="flex flex-col space-y-1.5"
                          >
                            <span className="text-sm">Category not found</span>
                            <span className="text-sm text-muted-foreground">
                              Tip: Create a new category
                            </span>
                          </CommandItem>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover> */}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Transaction Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[225px] justify-start text-left font-normal",
                          !transactiondate && "text-muted-foreground",
                          "border-2",
                          "border-slate-800",
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
                    <PopoverContent className="w-auto p-0 bg-gray-900 border-2 border-slate-800">
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
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 p-3">
            <Button
              type="button"
              className="bg-slate-700 hover:bg-slate-800"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-slate-50 hover:bg-slate-200 text-black"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
