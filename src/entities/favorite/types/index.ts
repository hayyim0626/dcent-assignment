export interface FavoriteItem {
  id: string;
  name: string;
  url: string;
  iconUrl: string;
}

export interface FavoritesApiResponse {
  success: boolean;
  data: FavoriteItem[];
  message?: string;
}
