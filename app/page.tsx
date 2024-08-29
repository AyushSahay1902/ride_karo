"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-lime-500 py-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-3xl font-bold">Ride Karo</h1>
          {/* <Link> */}
          <button
            className="px-4 py-2 bg-lime-200 text-black font-semibold rounded
            hover:bg-lime-300"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
          >
            SignIn/SignUp
          </button>
          {/* </Link> */}
        </nav>
      </header>
      <main className="flex flex-col items-center p-5">
        <div className="flex flex-col items-center">
          <h1
            className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-blue-500"
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ride Karo
          </h1>
          <p className="text-lg text-gray-600 font-bold max-w-md text-center mt-2">
            Weighing your options? Ride Karo - the smart choice for a seamless
            ride, every city, every time!
          </p>
        </div>
      </main>
    </div>
  );
}
