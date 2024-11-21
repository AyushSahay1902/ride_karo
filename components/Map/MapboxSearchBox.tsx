// "use client";

// import dynamic from "next/dynamic";
// import { MapPin } from "lucide-react";

// // Dynamically import SearchBox with no SSR
// const SearchBox = dynamic(
//   () =>
//     import("@mapbox/search-js-react").then(
//       (mod) => mod.SearchBox as React.ComponentType
//     ),
//   { ssr: false }
// );

// interface MapboxSearchBoxProps {
//   onSelectLocation: (result: any) => void;
//   placeholder: string;
//   iconColor: string;
// }

// const MapboxSearchBox = ({
//   onSelectLocation,
//   placeholder,
//   iconColor,
// }: MapboxSearchBoxProps) => {
//   return (
//     <div className="relative group">
//       <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
//         <MapPin className={`w-5 h-5 ${iconColor}`} />
//       </div>
//       <div className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
//         <SearchBox
//           accessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
//           options={{ country: "IN" }}
//           onRetrieve={onSelectLocation}
//           placeholder={placeholder}
//         />
//       </div>
//     </div>
//   );
// };

// export default MapboxSearchBox;
