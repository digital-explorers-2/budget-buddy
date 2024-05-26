import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";

export async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <header className="flex items-center border-b border-b-foreground/10 h-16">
          <div className="w-1/5 flex justify-center">
            <Logo />
          </div>
          <div className="w-4/5 flex justify-between items-center p-3">
            
            <div className="w-full flex justify-end items-center p-3 text-sm">
              <div className="ml-auto">
                <AuthButton />
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-screen flex flex-col items-center">
        <Navbar/>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
