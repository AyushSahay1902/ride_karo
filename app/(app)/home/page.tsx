"use client";
import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import RideComparisonForm from "@/components/Booking/RideComparisonForm";
import MapBox from "@/components/Map/MapBox";
import { UserLoactionCont } from "@/context/UserLocationCont";
import { LocationProvider } from "@/app/context/LocationContext";

// Sign Out button component
const SignOutButton = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirect to home page after sign out
  };

  return (
    <button
      className="px-4 py-2 bg-white text-lime-600 font-semibold rounded-full hover:bg-lime-100 transition duration-300 ease-in-out flex items-center"
      onClick={handleSignOut}
    >
      <LogOut size={18} className="mr-2" />
      SignOut
    </button>
  );
};

// Define the shape of userLocation to avoid using "any"
interface Location {
  latitude: number;
  longitude: number;
}

const Home = () => {
  const [userLocation, setUserLocation] = useState<Location | null>(null); // Initialize with null

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    // Get user's geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-lime-50 to-blue-50">
      <header className="flex justify-between items-center bg-lime-400 p-3 shadow-md">
        <h1 className="text-3xl font-bold text-white">Welcome, Rider!</h1>
        <UserButton />
      </header>

      <UserLoactionCont.Provider value={{ userLocation, setUserLocation }}>
        <main className="flex-grow flex flex-col items-center p-5">
          <div className="text-center mb-10">
            <h1
              className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-blue-500 mb-4"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ride Karo
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              Weighing your options? Ride Karo - the smart choice for a seamless
              ride, every city, every time!
            </p>
          </div>
          <LocationProvider>
            {/* Ride Comparison Form */}
            <RideComparisonForm />

            <div className="mt-5 w-full max-w-5xl h-[500px] justify-center items-center bg-green-100 rounded-lg overflow-hidden">
              {/* Only render MapBox when userLocation is available */}
              {userLocation ? (
                <MapBox location={userLocation} />
              ) : (
                <p>Loading map...</p>
              )}
            </div>
          </LocationProvider>
        </main>
      </UserLoactionCont.Provider>

      <div id="footer" className="bg-lime-50 py-8">
        <div className="flex flex-col items-center space-y-4 mb-4">
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-lime-600 transition"
              >
                Google
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-lime-600 transition"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-lime-600 transition"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-lime-600 transition"
              >
                X
              </a>
            </li>
          </ul>
        </div>

        <footer className="bg-lime-400 p-3 text-center text-white">
          <p>
            &copy; {new Date().getFullYear()} Ride Karo. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
