import { NextApiRequest, NextApiResponse } from "next";
import { FavoriteItem, FavoritesApiResponse } from "@/entities/favorite/types";
import { IMAGE_BASE_URL } from "@/shared/consts";

let mockFavorites: FavoriteItem[] = [
  {
    id: "opensea",
    name: "OpenSea, the largest NFT marketplace",
    url: "https://opensea.io",
    iconUrl: `${IMAGE_BASE_URL}/icon_opensea.png`
  },
  {
    id: "moonpay",
    name: "MoonPay",
    url: "https://buy.moonpay.com/v2/buy",
    iconUrl: `${IMAGE_BASE_URL}/icon_moonpay.png`
  },
  {
    id: "rarible",
    name: "Rarible - NFT Marketplace for Brands, Communities and Traders",
    url: "https://rarible.com/",
    iconUrl: `${IMAGE_BASE_URL}/icon_rarible.png`
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FavoritesApiResponse>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        res.status(200).json({
          success: true,
          data: mockFavorites
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          data: [],
          message: "즐겨찾기 목록을 불러오는데 실패했습니다."
        });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        mockFavorites = mockFavorites.filter((item) => item.id !== id);
        res.status(200).json({
          success: true,
          data: mockFavorites,
          message: "즐겨찾기에서 삭제되었습니다."
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          data: [],
          message: "삭제 중 오류가 발생했습니다."
        });
      }
      break;
  }
}
