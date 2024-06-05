//page.

import DeployButton from "@/components/DeployButton"
import AuthButton from "@/components/AuthButton"
import { createClient } from "@/utils/supabase/server"
import FetchDataSteps from "@/components/tutorial/FetchDataSteps"
import Header from "@/components/Header"
import { redirect } from "next/navigation"
import { NavigationMenuDemo } from "@/components/main-nav"
import Landing from "@/app/landing/landing"

export default async function ProtectedPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return <Landing />
}
