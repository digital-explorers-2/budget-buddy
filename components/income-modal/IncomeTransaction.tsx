"use client";

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
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";

export function IncomeTransaction({ isOpen, onClose }: StatesProps) {
  const [date, setDate] = React.useState<Date>()
  const [amount, setAmount] = React.useState<number>(0)
  const [category, setCategory] = React.useState<string>("")

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className=" w-full max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a new income transaction</DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
              />

              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left"
                      >
                        {category ? category : "Select category"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandItem
                            onSelect={() => setCategory("Create new")}
                          >
                            <Button className="font-medium w-full text-white bg-black ">
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
                  </Popover>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Transaction Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[225px] justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            className="bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className="bg-black text-white">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
