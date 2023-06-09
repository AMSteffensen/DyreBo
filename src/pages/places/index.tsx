import { useState, useEffect, ChangeEvent } from "react";
import supabase from "../../lib/supabase";
import PlaceCard from "@/components/PlaceCard";
import { Category, Place } from "@/types";

const PlacesPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<
    string | null
  >(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchPlaces();
    fetchCategories();
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
        if (Array.isArray(data)) {
          const placesData = data as Place[]; // Explicitly cast data to Place[]
          setPlaces(placesData);
        } else {
          console.error("Invalid data format for places:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories((data as Category[]) || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = () => {
    const filteredPlaces = places.filter((place) => {
      const titleMatch = place.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const descriptionMatch = place.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory
        ? place.category_id === selectedCategory
        : true;

      return titleMatch || (descriptionMatch && categoryMatch);
    });

    setSearchResults(filteredPlaces);
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryName(category.name);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const renderCategories = () => {
    return categories.map((category) => (
      <button
        key={category.id}
        className={`mb-2 mr-2 rounded-lg px-4 py-2 text-white shadow-md focus:outline-none ${
          selectedCategory === category.id ? "bg-blue-500" : "bg-gray-500"
        }`}
        onClick={() => handleCategoryClick(category)}
      >
        {category.name}
      </button>
    ));
  };

  const renderSearchResults = () => {
    if (searchResults.length > 0) {
      return (
        <div>
          {searchResults.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      );
    } else if (selectedCategory !== null) {
      const filteredPlaces = places.filter(
        (place) => place.category_id === selectedCategory
      );

      return (
        <div>
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="mb-2 text-xl font-bold">All Places</h2>
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">Search for places</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full rounded-md p-2 pl-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for places..."
            value={searchTerm}
            onChange={handleChange}
          />
          {searchTerm.length > 0 && (
            <button
              type="button"
              className="ml-2 flex items-center justify-center rounded-full p-2 hover:bg-gray-300"
              onClick={() => setSearchTerm("")}
            >
              <svg
                className="h-5 w-5 text-gray-500"
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

      <div>
        <div className="mb-4 flex flex-wrap pb-4">{renderCategories()}</div>
      </div>

      <div>
        <h2 className="mb-2 text-xl font-bold">{selectedCategoryName}</h2>
        {renderSearchResults()}
      </div>
    </div>
  );
};

export default PlacesPage;
