import { useInfiniteQuery } from "@tanstack/react-query";
import { DappFilters, DappApiResponse } from "@/entities/dapp/types";
import { environment } from "@/shared/config/environment";

interface FetchServicesParams extends DappFilters {
  page: number;
  limit?: number;
}

const fetchDappList = async (
  params: FetchServicesParams
): Promise<DappApiResponse> => {
  const searchParams = new URLSearchParams({
    page: params.page.toString(),
    limit: (params.limit || 20).toString(),
    language: params.language,
    platform: params.platform,
    environment: environment.buildEnv
  });

  if (params.searchQuery) {
    searchParams.append("search", params.searchQuery);
  }

  const response = await fetch(`/api/mock/dapp?${searchParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch dapp");
  }

  const data: DappApiResponse = await response.json();

  if (!data.success) {
    throw new Error("API returned error");
  }

  return data;
};

export const useDappList = (filters: DappFilters) => {
  return useInfiniteQuery({
    queryKey: ["services", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchDappList({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1
  });
};
