import { NextPage } from "next"
import ManageAccount from "./ManageAccount"
import { UserProvider } from "@/hooks/UserContext"
import { createClient } from "@/utils/supabase/server"

export default async function ManageAccountPage() {
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
      <ManageAccount />
    </UserProvider>
  )
 
}
