"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../app/public/logo.png";
import AuthButton from "@/components/AuthButton";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Home",
    href: "/protected",
    logo: true, // Indicate that this item is the logo
  },
  {
    title: "Dashboard",
    href: "/docs/primitives/hover-card",
  },

  {
    title: "Transactions",
    href: "/docs/primitives/progress",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <div className="flex items-center space-x-4 ">
        <NavigationMenuList className="flex space-x-4">
          {components.map(
            (component) =>
              !component.logo && (
                <NavigationMenuItem key={component.title}>
                  <Link href={component.href}>
                    <NavigationMenuLink className="text-sm font-medium">
                      {component.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ),
          )}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
