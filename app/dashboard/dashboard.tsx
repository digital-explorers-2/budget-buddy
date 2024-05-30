"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  return (
    <div className="h-full w-full">
      <div className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello "Username"</p>
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

      <div className="flex items-end justify-between gap-2 py-6">
        <h2>Overview</h2>
        <div className="flex items-center gap-3">
          <Button>NEW</Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Card className="w-full max-w-[200px]">
          <CardHeader>
            <CardTitle>Income</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-[200px]">
          <CardHeader>
            <CardTitle>Expense</CardTitle>
          </CardHeader>
        </Card>
        <Card className="w-full max-w-[200px]">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex gap-4 pt-4">
        <Card className="w-full max-w-[600px]">
          <CardHeader>
            <CardTitle>Income by category</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card className="w-full max-w-[600px]">
          <CardHeader>
            <CardTitle>Expenses By Category</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div>
        <h2>History</h2>
        <div>
          <div>
            <div className="flex items-center gap-4">
              <div>
                <Tabs
                  defaultValue="account"
                  className="w-[400px]"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Year</TabsTrigger>
                    <TabsTrigger value="password">Month</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account</CardTitle>
                      </CardHeader>
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
              </div>
              <div>
                <Button>OLD</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <IncomeTransaction
        isOpen={showIncomeModal}
        onClose={closeIncomeModal}
      />
    </div>
  )
}
