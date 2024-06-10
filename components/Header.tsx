// components/Header.tsx

import React from "react"
import Logo from "@/components/Logo"
import AuthButton from "@/components/AuthButton"
import ThemeToggleButton from "./ui/ThemeToggleButton"
import { getUser } from "@/utils/ServerActions/authActions"

const links = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  { name: "Manage Account", href: "/manageaccount" },
]

const Header = async () => {
  const user = await getUser()
  return (
    <header className="flex items-center border-b border-b-foreground/10 h-16  text-white  fixed top-0 left-0 w-full z-50 bg-custom-blue">
      {" "}
      <div className="w-1/5 flex justify-center">
        <Logo />
      </div>
      <div className="w-4/5 flex justify-between items-center p-3">
        <nav className="w-full flex justify-end items-center p-3 text-sm">
          <ul className="flex space-x-4">
            {user &&
              links.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
          </ul>
          <div className="ml-auto">
            <AuthButton />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
