import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center rounded-full bg-white p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] ring-4 ring-white/20"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find your Favorite Songs"
        className="min-w-0 flex-1 bg-transparent px-6 py-3 tracking-wide text-eggplant-900 placeholder-eggplant-400 outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-blossom-500 px-8 py-3 font-semibold tracking-wide text-white shadow-md transition hover:bg-blossom-600 md:px-16"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
