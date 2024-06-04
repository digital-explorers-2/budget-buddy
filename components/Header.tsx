// import NextLogo from "./NextLogo"
// import SupabaseLogo from "./SupabaseLogo"

// export default function Header() {
//   return (
//     <div className="flex flex-col gap-16 items-center">
//       <div className="flex gap-8 justify-center items-center">
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <SupabaseLogo />
//         </a>
//         <span className="border-l rotate-45 h-6" />
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <NextLogo />
//         </a>
//       </div>
//       <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
//       <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
//         The fastest way to build apps with{" "}
//         <a
//           href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Supabase
//         </a>{" "}
//         and{" "}
//         <a
//           href="https://nextjs.org/"
//           target="_blank"
//           className="font-bold hover:underline"
//           rel="noreferrer"
//         >
//           Next.js
//         </a>
//       </p>
//       <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
//     </div>
//   )
// }

// components/Header.tsx

import React from "react"
import Logo from "@/components/Logo"
import AuthButton from "@/components/AuthButton"
import ThemeToggleButton from "./ui/ThemeToggleButton"

const links = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Transactions", href: "/transactions" },
  { name: "Manage Account", href: "/manageaccount" },
]

const Header = () => {
  return (
    <header className="flex items-center border-b border-b-foreground/10 h-16  text-white  fixed top-0 left-0 w-full z-50 bg-custom-blue">
      {" "}
      <div className="w-1/5 flex justify-center">
        <Logo />
      </div>
      <div className="w-4/5 flex justify-between items-center p-3">
        <nav className="w-full flex justify-end items-center p-3 text-sm">
          <ul className="flex space-x-4">
            {links.map(link => (
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
