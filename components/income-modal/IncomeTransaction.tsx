"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function IncomeTransaction() {
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center space-y-6 pt-10">
      <div className="flex min-h-screen items-start justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Create a new income transaction</CardTitle>
            <CardDescription>
              Select your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Input type="description"></Input>
                  <Label htmlFor="amount">Amount</Label>
                  <Select>
                    <SelectTrigger id="amount">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="USD">
                        USD - United States Dollar
                      </SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex space-x-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="category">Select Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="USD">
                            USD - United States Dollar
                          </SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">
                            GBP - British Pound
                          </SelectItem>
                          <SelectItem value="JPY">
                            JPY - Japanese Yen
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="date">Transaction Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[225px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Confirm</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
