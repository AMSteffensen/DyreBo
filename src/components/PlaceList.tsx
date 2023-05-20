import React from "react";
import supabase from "../lib/supabase";
import PlaceCard from "./PlaceCard";

const PlaceList = () => {
  const [places, setPlaces] = React.useState([]);

  React.useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data, error } = await supabase.from("places").select("*");
        if (error) throw error;
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default PlaceList;
