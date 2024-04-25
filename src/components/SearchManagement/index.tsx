import React, { useState } from "react";

interface ISearchProps {
  type: string;
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

const SearchManagement = ({ type, placeholder, onSearch }: ISearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchManagement;
