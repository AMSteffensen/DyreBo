import React from "react";
import supabase from "../lib/supabase";
import PlaceCard from "./PlaceCard";

const PlaceList = () => {
  const [places, setPlaces] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data, error } = await supabase.from("places").select("*");
        if (error) throw error;
        setPlaces(data || []);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <PlaceCard key={place?.id} place={place} />
      ))}
    </div>
  );
};

export default PlaceList;
