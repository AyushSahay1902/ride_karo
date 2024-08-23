import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-lime-500 py-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-lg font-bold">Ride Karo</h1>
          {/* <Link> */}
          <a className="text-lg font-bold">Profile</a>
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
        <div className="flex mt-4 p-5">
          {/* Left section */}
          <div className="flex flex-col justify-center w-1/2">
            <h1 className="text-5xl font-bold mb-8">
              Request a ride for now or later
            </h1>
            <p className="text-lg mb-4">
              Add your trip details, hop in, and go.
            </p>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full p-4 border rounded-lg"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full p-4 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-black text-white rounded-lg">
                  See prices
                </button>
                <button className="px-6 py-3 bg-gray-200 rounded-lg">
                  Schedule for later
                </button>
              </div>
            </form>
          </div>

          {/* Right section with the image */}
          <div
            className="w-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url('/path-to-your-image.png')" }}
          >
            <div className="h-full w-full bg-black opacity-25"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
