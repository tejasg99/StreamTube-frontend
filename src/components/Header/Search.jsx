import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    };

    const onSubmit = (e) => {
      e.preventDefault();
      console.log("Search query: ", query);
    }
    

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-between items-center p-2">
        <input
          type="text"
          name="text"
          className="input border rounded-2xl rounded-r-none bg-slate-100 text-black py-[2px] px-4 w-[300px] h-[30px] "
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">
          <IoSearchSharp className="bg-blue-700 text-white w-9 h-[30px] pt-[2px] px-2 rounded-2xl rounded-l-none"/>
        </button>
      </div>
    </form>
  );
};

export default Search;
