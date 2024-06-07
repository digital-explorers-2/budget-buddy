// hooks/UserContext.tsx
"use client"

import { createContext, useContext, ReactNode } from "react"
import { User } from "@supabase/supabase-js"

interface UserContextType {
  user: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  user: User
  children: ReactNode
}

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
