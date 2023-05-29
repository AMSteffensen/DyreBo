import { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for places..."
        className="w-full rounded border border-gray-300 px-4 py-2 shadow"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        className="absolute right-0 top-0 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
