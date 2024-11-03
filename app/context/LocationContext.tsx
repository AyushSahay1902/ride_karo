import React, { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Define interfaces
interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

interface LocationState {
  address: string;
  coordinates: Coordinates;
}

interface LocationContextType {
  pickupLocation: LocationState;
  setPickupLocation: React.Dispatch<React.SetStateAction<LocationState>>;
  dropoffLocation: LocationState;
  setDropoffLocation: React.Dispatch<React.SetStateAction<LocationState>>;
}

// Step 2: Create the context with a default value of undefined
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
}

// Step 3: Create the provider component with types
export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [pickupLocation, setPickupLocation] = useState<LocationState>({
    address: "",
    coordinates: { latitude: null, longitude: null },
  });
  const [dropoffLocation, setDropoffLocation] = useState<LocationState>({
    address: "",
    coordinates: { latitude: null, longitude: null },
  });

  return (
    <LocationContext.Provider
      value={{
        pickupLocation,
        setPickupLocation,
        dropoffLocation,
        setDropoffLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Step 4: Create a custom hook to access the context with type checking
export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
