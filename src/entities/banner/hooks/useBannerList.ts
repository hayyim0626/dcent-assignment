import { useQuery } from "@tanstack/react-query";
import { Banner } from "../types";
import { ApiResponse } from "@/pages/api/mock/types";

const fetchBanners = async (): Promise<Banner[]> => {
  const response = await fetch("/api/mock/banners");

  if (!response.ok) {
    throw new Error("Failed to fetch banners");
  }

  const data: ApiResponse<Banner[]> = await response.json();

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
