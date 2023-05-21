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
        className="shadow rounded border border-gray-300 px-4 py-2 w-full"
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
  );
};

export default SearchInput;
