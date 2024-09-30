import { UserLoactionCont } from "@/context/UserLocationCont";
import React, { useContext } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  const { userLocation, setUserLocation } = useContext(UserLoactionCont);
  return (
    <div className="p-5 text-[20px] font-semibold">
      {/* <h2>Map</h2> */}

      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: userLocation?.longitude || -122.4,
          latitude: userLocation?.latitude || 37.8,
          zoom: 14,
        }}
        style={{ width: "100%", height: 500, borderRadius: 10 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={userLocation?.longitude}
          latitude={userLocation?.latitude}
          anchor="bottom"
        >
          <img className="w-10 h-10" src="@/public/location-pin.png" />
        </Marker>
      </Map>
    </div>
  );
};

export default MapBox;
