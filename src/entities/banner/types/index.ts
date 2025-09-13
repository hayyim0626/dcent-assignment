export interface Banner {
  id: string;
  title: string | null;
  ko: {
    description: string | null;
    imageUrl: string;
    ctaText: string | null;
    ctaUrl: string;
  };
  en: {
    description: string | null;
    imageUrl: string;
    ctaText: string | null;
    ctaUrl: string;
  };
  order: number;
  isActive: boolean;
}

export interface BannerApiResponse {
  success: boolean;
  data: Banner[];
  total: number;
}
