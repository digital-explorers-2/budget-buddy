// CurrencySelector.tsx
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useUser } from "@/hooks/UserContext"

const CurrencySelector: React.FC = () => {
  const { user } = useUser()
  const router = useRouter()
  const [currentCurrency, setCurrentCurrency] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCurrentCurrency = async () => {
      if (!user) return

      try {
        console.log("Fetching current currency for user:", user.id)
        const { data, error } = await supabase
          .from("user_profiles")
          .select("preferred_currency")
          .eq("user_id", user.id)
          .single()

        if (error) {
          console.error("Error fetching current currency:", error)
          return
        }

        console.log("Fetched preferred currency:", data.preferred_currency)
        setCurrentCurrency(data.preferred_currency)
      } catch (error) {
        console.error("Unexpected error fetching currency data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentCurrency()
  }, [user])

  const redirectToCurrencySelector = () => {
    router.push("/currencyselector")
  }

  return (
    <div className="mb-12 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Currency</h2>
      <div className="mb-4">
        <span className="block font-medium mb-2">Current Currency:</span>
        <span className="text-lg">
          {loading ? "Loading..." : currentCurrency}
        </span>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={redirectToCurrencySelector}
      >
        Change Currency
      </button>
    </div>
  )
}

export default CurrencySelector
