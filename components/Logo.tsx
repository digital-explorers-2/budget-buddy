import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../app/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src={logo} alt="Logo" width={80} height={80} />
      <span className="text-xl font-bold ml-2">BudgetBuddy</span>
    </Link>
  );
}
