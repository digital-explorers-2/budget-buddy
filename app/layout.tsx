// RootLayout.tsx
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import Footer from "@/components/footer"
import DeployButton from "@/components/DeployButton"
import AuthButton from "@/components/AuthButton"
import { createClient } from "@/utils/supabase/server"
import FetchDataSteps from "@/components/tutorial/FetchDataSteps"
import Header from "@/components/Header"
import { redirect } from "next/navigation"
import Logo from "@/components/Logo"

export async function ProtectedPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistSans.className}
    >
      <head>
        <script src="/theme-toggle.js" />
      </head>
      <body className="bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 ">
        {" "}
        <Header />
        <main className="min-h-screen flex flex-col items-stretch w-full mt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
