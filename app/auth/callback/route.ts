import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function GET(req: NextRequest) {
  // Instantiates a new instance of supabase, route handler variation
  const supabase = createRouteHandlerClient({ cookies })
  
  // Extracts the search params from the requested url, supabase assigns
  // some custom search params to verify auth
  const { searchParams } = new URL(req.url)
  
  // a verification code is extracted from the search params
  const code = searchParams.get("code")

  if (code) {
    // Create a cookie-based user session from the code
    await supabase.auth.exchangeCodeForSession(code)
  }
  // Redirect the user to the base URL after authentication
  return NextResponse.redirect(new URL("/", req.url))
}