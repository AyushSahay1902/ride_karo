import ModeofTransport from "@/data/ModeofTransport";
import Image from "next/image";
import React, { useState } from "react";

// Define the type for transport modes
interface Mode {
  id: number;
  mode: string;
  image: string;
  price: number;
}

const Cars: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);

  const handleSelect = (modeId: number) => {
    setSelectedMode(modeId);
  };

  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select Car/Bus/Bike:</h2>
      <div className="flex space-x-4 mt-4">
        {ModeofTransport.map((mode: Mode) => (
          <div
            key={mode.id}
            onClick={() => handleSelect(mode.id)}
            className={`flex flex-col items-center justify-center border rounded-lg p-2 cursor-pointer transition duration-200 ${
              selectedMode === mode.id ? "bg-blue-500 text-white" : "bg-white"
            }`}
            style={{ width: "60px", height: "60px" }} // Adjusted box size for better visibility
          >
            <Image
              src={mode.image}
              alt={mode.mode}
              width={30}
              height={30}
              className="object-contain"
            />
            <h3 className="text-sm mt-1">{mode.mode}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
