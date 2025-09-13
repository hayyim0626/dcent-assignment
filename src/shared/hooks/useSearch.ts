import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useSearch = (delay: number = 300) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
  }, delay);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSetQuery(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    clearSearch
  };
};
