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
    event.preventDefault();
    setSearchResults([]);

    if (searchTerm.trim() === "") {
      return;
    }

    const filteredPlaces = places.filter(
      (place) =>
        place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredPlaces);
  };

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredPlaces = places.filter(
      (place) =>
        place.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredPlaces);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Places Page</h1>
      <form onSubmit={handleSearch}>
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full p-2 pl-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for places..."
            value={searchTerm}
            onChange={handleChange}
          />
          {searchTerm.length === 0 && (
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 18l6-6m0 0l-6-6m6 6H4"
              />
            </svg>
          )}
          {searchTerm && (
            <button
              type="button"
              className="flex items-center justify-center ml-2 p-2 rounded-full hover:bg-gray-300"
              onClick={handleClear}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>
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
