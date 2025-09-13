import { NextApiRequest, NextApiResponse } from "next";
import { Banner, BannerApiResponse } from "@/entities/banner/types";
import { delay } from "@/shared/utils/functions";

const BASE_URL =
  "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images";

const mockBanners: Banner[] = [
  {
    id: "mapo-airdrop",
    title: null,
    ko: {
      description: null,
      imageUrl: `${BASE_URL}/banner_mapo_kr.png`,
      ctaText: null,
      ctaUrl:
        "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol"
    },
    en: {
      description: null,
      imageUrl: `${BASE_URL}/banner_mapo_kr.png`,
      ctaText: null,
      ctaUrl:
        "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol"
    },
    order: 1,
    isActive: true
  },
  {
    id: "dcent-wallet",
    title: "D'CENT Wallet",
    ko: {
      description: `디센트 지문인증형 지갑으로\n 한층 더 강화된 보안을 경험하세요!`,
      imageUrl: `${BASE_URL}/banner_dcent.png`,
      ctaText: "구매하기",
      ctaUrl: "https://store-kr.dcentwallet.com"
    },
    en: {
      description: "Enhance your security\n with D'CENT biometric wallet",
      imageUrl: `${BASE_URL}/banner_dcent.png`,
      ctaText: "Buy Now",
      ctaUrl: "https://store.dcentwallet.com"
    },
    order: 2,
    isActive: true
  },
  {
    id: "dcent-blog",
    title: "D'CENT Blog",
    ko: {
      description:
        "새로운 디센트 블로그를 방문하여\n 최신 업데이트를 먼저 확인해보세요!",
      imageUrl: `${BASE_URL}/banner_blog.png`,
      ctaText: "확인하기",
      ctaUrl: "https://store-kr.dcentwallet.com/blogs/post"
    },
    en: {
      description:
        "Visit the new D'CENT Blog\n to explore the latest updates first!",
      imageUrl: `${BASE_URL}/banner_blog.png`,
      ctaText: "Explore",
      ctaUrl: "https://store.dcentwallet.com/blogs/post"
    },
    order: 3,
    isActive: true
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BannerApiResponse>
) {
  await delay(300);

  try {
    const sortedBanners = mockBanners
      .filter((banner) => banner.isActive)
      .sort((a, b) => a.order - b.order);

    res.status(200).json({
      success: true,
      data: sortedBanners,
      total: sortedBanners.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      total: 0
    });
  }
}
