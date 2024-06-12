import { createClient } from "@/utils/supabase/server"
import { UserProvider } from "@/hooks/UserContext"
import { Dashboard } from "./dashboard"

export default async function mainDashboard() {
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
      <Dashboard />
    </UserProvider>
  )
}
