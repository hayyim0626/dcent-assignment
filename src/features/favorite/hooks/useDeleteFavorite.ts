import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FavoriteItem, FavoritesApiResponse } from "@/entities/favorite/types";

const deleteFavorite = async (id: string): Promise<FavoriteItem[]> => {
  const response = await fetch(`/api/mock/favorite?id=${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete favorite");
  }

  const data: FavoritesApiResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Delete failed");
  }

  return data.data;
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: (newFavorites) => {
      queryClient.setQueryData(["favorites"], newFavorites);
    },
    onError: (error) => {
      console.error("Failed to delete favorite:", error);
    }
  });
};
