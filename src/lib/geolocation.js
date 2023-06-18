import { useEffect, useState } from "react";
import OpenCageApiClient from "opencage-api-client";

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await OpenCageApiClient.geocode({
          q: "auto",
          key: apiKey, // Replace with your OpenCage Data API key
        });

        if (response.results.length > 0) {
          const { formatted } = response.results[0];
          setLocation(formatted);
        }
      } catch (error) {
        console.error("Error fetching geolocation:", error);
      }
    };

    fetchLocation();
  }, []);

  return location;
};

export default useGeolocation;
