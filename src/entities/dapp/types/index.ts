export interface Dapp {
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

export interface DappFilters {
  language: "ko" | "en";
  platform: "android" | "ios";
  environment: "dev" | "stage" | "prod";
  searchQuery?: string;
}

export interface DappApiResponse {
  success: boolean;
  data: Dapp[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}
