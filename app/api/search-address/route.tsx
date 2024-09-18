import { NextResponse } from "next/server";

const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  try {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("text");

    // Check if searchText is provided
    if (!searchText) {
      return NextResponse.json(
        { error: "Search text is required" },
        { status: 400 }
      );
    }

    // Construct the URL with the required parameters
    const url = `${BASE_URL}?text=${encodeURIComponent(
      searchText
    )}&language=en&limit=5&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Fetch data from Mapbox API
    const data = await res.json();
    // Check if the response was successful
    if (!data.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from Mapbox" },
        { status: res.status }
      );
    }

    // Return the API response as JSON
    return NextResponse.json({ data });
  } catch (error) {
    // Return error message if something goes wrong
    return NextResponse.json(
      { error: "An error occurred while fetching suggestions" },
      { status: 500 }
    );
  }
}
