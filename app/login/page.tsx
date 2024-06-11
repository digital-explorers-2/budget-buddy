"use client"
import { createClient } from "@/utils/supabase/client"
import { Auth } from "@supabase/auth-ui-react"

export default function Login() {
  const supabase = createClient()

  return (
    <div className="flex-1 px-8 gap-2 flex items-center justify-center bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Sign up & Login Here
        </h1>
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          redirectTo="http://localhost:3000/auth/callback"
        />
      </div>
    </div>
  )
}
