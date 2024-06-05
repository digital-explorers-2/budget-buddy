//page.

import DeployButton from "@/components/DeployButton"
import AuthButton from "@/components/AuthButton"
import { createClient } from "@/utils/supabase/server"
import FetchDataSteps from "@/components/tutorial/FetchDataSteps"
import Header from "@/components/Header"
import { redirect } from "next/navigation"
import { NavigationMenuDemo } from "@/components/main-nav"

export default async function ProtectedPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return <div className="flex-1 w-full flex flex-col gap-20 items-center"></div>
}
