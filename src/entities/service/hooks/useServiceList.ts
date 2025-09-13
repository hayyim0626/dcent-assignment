import { useInfiniteQuery } from "@tanstack/react-query";
import { ServiceFilters, ServiceApiResponse } from "@/entities/service/types";
import { environment } from "@/shared/config/environment";

interface FetchServicesParams extends ServiceFilters {
  page: number;
  limit?: number;
}

const fetchServiceList = async (
  params: FetchServicesParams
): Promise<ServiceApiResponse> => {
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

  const response = await fetch(`/api/mock/service?${searchParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }

  const data: ServiceApiResponse = await response.json();

  if (!data.success) {
    throw new Error("API returned error");
  }

  return data;
};

export const useServiceList = (filters: ServiceFilters) => {
  return useInfiniteQuery({
    queryKey: ["services", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchServiceList({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1
  });
};
