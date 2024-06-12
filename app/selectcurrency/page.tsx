import { createClient } from "@/utils/supabase/server"
import { UserProvider } from "@/hooks/UserContext"
import { SelectCurrency } from "@/components/currency-selector/select-currency"

export default async function CurrencySelector() {


  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    // Handle the case where the user is not authenticated
    return <p>User not found. Please log in.</p>
  }

  return (
    <UserProvider user={user}>
      <SelectCurrency />
    </UserProvider>
  )

}
