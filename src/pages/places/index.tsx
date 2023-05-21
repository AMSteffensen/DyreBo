import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching places:", error.message);
      } else {
        setPlaces(data);
      }
    } catch (error) {
      console.error("Error fetching places:", error.message);
    }
  };

  const handleSearch = () => {
    const results = places.filter(
      (place) =>
        place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Places Page</h1>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for places..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          className="absolute right-0 top-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold mb-2">Search Results</h2>
          {/* Render the search results */}
          {searchResults.map((place) => (
            <div key={place.id} className="mb-4">
              <h3 className="text-lg font-bold">{place.title}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">All Places</h2>
          {/* Render all places */}
          {places.map((place) => (
            <div key={place.id} className="mb-4">
              <h3 className="text-lg font-bold">{place.title}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
