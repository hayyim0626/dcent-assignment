import { useQuery } from "@tanstack/react-query";
import { FavoritesApiResponse, FavoriteItem } from "../types";

const fetchFavorite = async (): Promise<FavoriteItem[]> => {
  const response = await fetch("/api/mock/favorite");

  if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const data: FavoritesApiResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || "API returned error");
  }

  return data.data;
};

export const useFavorite = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorite
  });
};
