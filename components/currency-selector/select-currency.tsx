"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import useMediaQuery from "../../hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/hooks/UserContext"

type Currency = {
  id: string
  code: string
  name: string
}

export function SelectCurrency() {
  const { user } = useUser()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null)
  const [currencies, setCurrencies] = React.useState<Currency[]>([])
  const [exchangeRates, setExchangeRates] = React.useState<{
    [key: string]: number
  }>({})

  React.useEffect(() => {
    const fetchCurrencies = async () => {
      const { data, error } = await supabase
        .from("currency")
        .select("id, code, name, exchangerate")
      if (error) {
        console.error("Error fetching currencies:", error)
      } else {
        setCurrencies(data)
        const rates = data.reduce((acc, curr) => {
          acc[curr.code] = curr.exchangerate
          return acc
        }, {})
        setExchangeRates(rates)
      }
    }
    fetchCurrencies()
  }, [])

  const handleConfirmCurrency = async () => {
    if (!selectedCurrency) {
      alert("Please select a currency")
      return
    }
    if (!user) {
      alert("User not authenticated")
      return
    }

    try {
      const { error } = await supabase
        .from("user_profiles")
        .upsert(
          { user_id: user.id, preferred_currency: selectedCurrency.code },
          { onConflict: ["user_id"] },
        )

      if (error) {
        console.error("Error updating preferred currency:", error)
        alert(`Failed to update currency: ${error.message}`)
      } else {
        alert("Preferred currency updated successfully")
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Unexpected error updating currency:", error)
      alert(`Unexpected error: ${error.message}`)
    }
  }

  if (isDesktop) {
    return (
      <div className="flex flex-col w-full h-full min-h-screen items-center justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar>
            <AvatarImage
              src={
                user?.avatar_url ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              }
              alt="User Image"
            />
            <AvatarFallback>{user?.name || "User"}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col space-y-1.5 items-center justify-center">
          <span>
            <h1>Welcome, {user?.email || "User"}!</h1>
          </span>
          <span>
            <h3>Let's get started by setting up your currency</h3>
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full p-3 gap-5">
          <Card className="w-full h-full max-w-[700px] max-h-[600px] relative z-10">
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>
                Select your default currency for transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <PopoverTrigger asChild>
                    <Button className="w-full bg-black text-white">
                      {selectedCurrency ? (
                        <>{selectedCurrency.code}</>
                      ) : (
                        <>Select Currency</>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0 bg-white shadow-md rounded-md text-black"
                    align="start"
                  >
                    <CurrencyList
                      currencies={currencies}
                      setOpen={setOpen}
                      setSelectedCurrency={setSelectedCurrency}
                    />
                  </PopoverContent>
                </Popover>
              </form>
            </CardContent>
          </Card>
          <div className="w-full max-w-[700px]">
            <Button
              variant="outline"
              className="w-full bg-blue-500 text-white hover:bg-green-500"
              onClick={handleConfirmCurrency}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col w-full h-full min-h-screen items-center justify-center space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar>
          <AvatarImage
            src={
              user?.avatar_url ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            }
            alt="User Image"
          />
          <AvatarFallback>{user?.email || "User"}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col space-y-1.5 items-center justify-center">
        <span>
          <h1>Welcome, {user?.email || "User"}!</h1>
        </span>
        <span>
          <h3>Let's get started by setting up your currency</h3>
        </span>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full p-3 gap-5">
        <Card className="w-full h-full max-w-[900px] max-h-[600px] relative z-10">
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
              Select your default currency for transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 relative">
                  <Popover
                    open={open}
                    onOpenChange={setOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button className="w-full bg-black text-white">
                        {selectedCurrency ? (
                          <>{selectedCurrency.code}</>
                        ) : (
                          <>Select Currency</>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[200px] p-0 bg-white shadow-md rounded-md text-black"
                      align="start"
                    >
                      <CurrencyList
                        currencies={currencies}
                        setOpen={setOpen}
                        setSelectedCurrency={setSelectedCurrency}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="w-full max-w-[900px]">
          <Button
            className="w-full bg-blue-500 text-white hover:bg-green-500"
            onClick={handleConfirmCurrency}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}

function CurrencyList({
  currencies,
  setOpen,
  setSelectedCurrency,
}: {
  currencies: Currency[]
  setOpen: (open: boolean) => void
  setSelectedCurrency: (currency: Currency | null) => void
}) {
  return (
    <Command>
      <CommandInput
        placeholder="Filter currency..."
        className="text-black"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {currencies.map(currency => (
            <CommandItem
              className="hover:bg-gray-300 text-black"
              key={currency.id}
              value={currency.code}
              onSelect={value => {
                setSelectedCurrency(
                  currencies.find(c => c.code === value) || null,
                )
                setOpen(false)
              }}
            >
              {currency.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
