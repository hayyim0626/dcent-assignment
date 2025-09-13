export interface Service {
  id: string;
  name: string;
  description: {
    ko?: string;
    en?: string;
  };
  iconUrl: string;
  url?: string;
  networks?: string[];
  visibility: {
    languages: ("ko" | "en")[];
    platforms: ("android" | "ios")[];
    environments: ("dev" | "stage" | "prod")[];
  };
}

export interface ServiceFilters {
  language: "ko" | "en";
  platform: "android" | "ios";
  environment: "dev" | "stage" | "prod";
  searchQuery?: string;
}

export interface ServiceApiResponse {
  success: boolean;
  data: Service[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}
