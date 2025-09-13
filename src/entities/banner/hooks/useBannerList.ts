import { useQuery } from "@tanstack/react-query";
import { Banner, BannerApiResponse } from "../types";

const fetchBanners = async (): Promise<Banner[]> => {
  const response = await fetch("/api/mock/banners");

  if (!response.ok) {
    throw new Error("Failed to fetch banners");
  }

  const data: BannerApiResponse = await response.json();

  if (!data.success) {
    throw new Error("API returned error");
  }

  return data.data;
};

export const useBannerList = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners
  });
};
