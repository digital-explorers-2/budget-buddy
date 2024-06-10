"use client"
"use client"
import Link from "next/link"
import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/client"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { SubmitButton } from "./submit-button"
import { Auth } from "@supabase/auth-ui-react"

export default function Login() {
  const supabase = createClient()
  // const signIn = async (formData: FormData) => {
  //   "use server"

  //   const email = formData.get("email") as string
  //   const password = formData.get("password") as string
  //   const supabase = createClient()

  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   })

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user")
  //   }

  //   return redirect("/")
  // }

  // const signUp = async (formData: FormData) => {
  //   "use server"

  //   const origin = headers().get("origin")
  //   const email = formData.get("email") as string
  //   const password = formData.get("password") as string
  //   const supabase = createClient()

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   })

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user")
  //   }

  //   return redirect("/login?message=Check email to continue sign in process")
  // }

  return (
    <div className="flex-1 px-8   gap-2 flex items-center justify-center ">
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        redirectTo="http://localhost:3000/auth/callback"
      />

      {/* <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm mt-16"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div className="  shadow-custom-strong py-4 px-4">
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <h1 className="text-2xl">Create account then login here:</h1>
          <br />

          <label
            className="text-md"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="email"
            required
          />
          <label
            className="text-md"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-green-600 hover:bg-green-600  rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Login
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div> */}
    </div>
  )
}
