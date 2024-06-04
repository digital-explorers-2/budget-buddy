import Head from "next/head"
import Image from "next/image"
import Features from "@/components/Features"
import Testimonials from "@/components/Testimonials"
import CallToAction from "@/components/callToAction"
import person from "@/app/public/images/person.png"
import { Button } from "@/components/ui/button"
import { getUser } from "@/utils/ServerActions/authActions"
import Link from "next/link"


const Home = async () => {
  const user = await getUser()


  return (
    <div>
      <Head>
        <title>Budget Tracker</title>
        <meta
          name="description"
          content="A budget tracker app landing page"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="w-full px-8 bg-finance-gradient">
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold mb-6 text-white font-poppins">
              Master Your Finances with Budget Buddy
            </h1>
            <p className="text-xl mb-6 text-white font-poppins">
              Take control of your money effortlessly with our intuitive budget
              tracker.
            </p>

            <Features />
            <div className="text-center md:text-left mb-5 mt-4">
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-green-600 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-200 ease-in-out glow-button text-xl mt-6">
                    Get Started!
                  </Button>
                </Link>
              ) : (
                <Button
                  disabled
                  className="bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-200 ease-in-out text-xl glow-button mt-6 cursor-not-allowed"
                >
                  Get Started!
                </Button>
              )}
              {!user && (
                <Link href="/login">
                  <Button className="ml-7 bg-transparent border border-white text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-200 ease-in-out text-xl glow-button mt-6">
                    Sign Up Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex justify-center md:justify-start w-full h-screen">
            <div className="relative w-full h-full py-3 px-3">
              <div className="relative w-full h-full">
                <Image
                  src={person}
                  alt="Budget Tracker App"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* <Testimonials />
        <CallToAction /> */}
      </main>
    </div>
  )
}

export default Home
