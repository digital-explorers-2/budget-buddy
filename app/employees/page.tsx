// pages/employees/page.tsx
import { createServerClient } from "@/lib/supabaseClient"

export default async function Employees() {
  const supabase = createServerClient()
  const { data: employees, error } = await supabase
    .from("employees")
    .select("*")

  if (error) {
    console.error("Error fetching employees:", error.message)
    return <div>Error loading employees.</div>
  }

  console.log("Employees data: ", employees)

  return <pre>{JSON.stringify(employees, null, 2)}</pre>
}
