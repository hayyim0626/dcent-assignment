import { NextApiRequest, NextApiResponse } from "next";
import { Dapp, DappFilters, DappApiResponse } from "@/entities/dapp/types";
import { IMAGE_BASE_URL } from "@/shared/consts";

const mockDapps: Dapp[] = [
  {
    id: "moonpay",
    name: "MoonPay",
    description: {
      en: "MoonPay offers simple and safer way to buy crypto instantly using VISA/Mastercard payment"
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_moonpay.png`,
    url: "https://buy.moonpay.com",
    visibility: {
      languages: ["en"],
      platforms: ["ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "ftso-portal",
    name: "FTSO Portal",
    description: {
      en: "FTSO Portal is a service by D'CENT to provide fast and easy way to delegate Vote Power to the user's favorite FTSO provider. By delegating Vote Power, users can earn passive income as reward.",
      ko: "FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다. 사용자는 Vote Power 위임을 통해 패시브인컴(passive income)을 보상으로 받을 수 있습니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_ftso.png`,
    url: "https://ftsoportal.com/",
    networks: ["Songbird", "Flare"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "astar-portal",
    name: "Astar Portal",
    description: {
      en: "Astar Portal is the official Astar Network application for using everything that Astar Network offers.",
      ko: "아스타포탈은 Astar Network에서 제공하는 모든 것을 사용하기 위한 Astar Network의 공식 애플리케이션입니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_astar.png`,
    url: "https://portal.astar.network/",
    networks: ["Astar"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage"]
    }
  },
  {
    id: "1inch",
    name: "1inch",
    description: {
      en: "1inch is a decentralized exchange (DEX) aggregator. It's designed to roll liquidity and pricing from all major DEXes into one platform, making it easy to get the best price for the desired trade.",
      ko: "1inch는 모든 주요 DEX 거래소의 유동성과 가격 정보를 하나의 플랫폼에서 제공합니다. 원하는 거래의 가격을 쉽게 조회하여 토큰을 교환할 수 있습니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_1inch.png`,
    url: "https://app.1inch.io/",
    networks: ["Ethereum"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "xdsea",
    name: "XDSea",
    description: {
      en: "XDSea is the world's first and largest peer-to-peer decentralized marketplace for buying and selling NFTs built on the XDC Network.",
      ko: "XDSea는 XDC 네트워크에 구축된 NFT를 사고 파는 세계 최초이자 최대 규모의 P2P 분산형 시장입니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_xdsea.png`,
    networks: ["XDC Network"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "compound",
    name: "Compound",
    description: {
      en: "Compound is Ethereum's algorithmic money market protocol that allows users to earn interest or borrow assets through collateral. Anyone can supply assets to Compound's liquidity pool and earn continuous compound interest immediately.",
      ko: "Compound는 담보를 통해 이자를 얻거나 자산을 빌릴 수 있는 이더리움 기반의 머니 마켓 프로토콜입니다. 컴파운드의 유동성 풀에 자산을 공급하면 복리이자를 얻을 수 있습니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_compound.png`,
    url: "https://app.compound.finance/",
    networks: ["Ethereum"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "pooltogether",
    name: "PoolTogether",
    description: {
      en: 'PoolTogether is an Ethereum based application that makes saving money as fun as a game. You join a pool by getting a "savings ticket". Each Savings Ticket gives you a chance to win a prize, but even if you don\'t win, you keep all your money!',
      ko: "PoolTogether는 저축을 재미있게 하는 이더리움 기반의 서비스입니다. 자산을 예치하면 \"저축 티켓\"을 받아 '풀'에 참여합니다. 각 저축 티켓은 풀에서 발생한 이자를 받을 수있는 기회를 제공하지만, 당첨되지 않더라도 손실이 없습니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_pooltogether.png`,
    url: "https://app.pooltogether.com/",
    networks: ["Ethereum"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "opensea",
    name: "OpenSea",
    description: {
      en: "OpenSea is a marketplace for digital goods, including collectibles, game items, digital art, and other digital assets backed by blockchain such as Ethereum.",
      ko: "OpenSea는 수집품, 게임 아이템, 디지털 아트와 같은 이더리움 기반의 디지털 상품 및 디지털 자산을 거래할 수 있는 마켓 플레이스입니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_opensea.png`,
    url: "https://opensea.io/",
    networks: ["Ethereum", "Polygon"],
    visibility: {
      languages: ["ko", "en"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  },
  {
    id: "bluewhale",
    name: "BlueWhale",
    description: {
      ko: "블루웨일 프로토콜은 사용하기 쉬운 디파이 서비스를 지향하는 프로젝트입니다. 디파이 대시보드, DEX 어그리게이터, 자동 재예치 서비스 등 탈중앙화 금융(DeFi) 관련 서비스 제공을 통해 클레이튼 디파이 생태계 활동을 더 쉽고 효율적으로 만듭니다."
    },
    iconUrl: `${IMAGE_BASE_URL}/icon_bluewhale.png`,
    url: "https://bwpm.io/",
    networks: ["Kaia"],
    visibility: {
      languages: ["ko"],
      platforms: ["android", "ios"],
      environments: ["dev", "stage", "prod"]
    }
  }
];

// // 1000개 이상의 Mock 데이터 생성을 위한 확장
// const generateExtendedServices = (): Dapp[] => {
//   const baseServices = [...mockServices];
//   const extendedServices: Dapp[] = [];

//   for (let i = 0; i < 200; i++) {
//     // 200번 반복해서 1800개 추가 생성
//     baseServices.forEach((service, index) => {
//       const duplicatedService: Dapp = {
//         ...service,
//         id: `${service.id}-${i}-${index}`,
//         name: `${service.name} ${i + 1}-${index + 1}`,
//       };
//       extendedServices.push(duplicatedService);
//     });
//   }

//   return [...baseServices, ...extendedServices];
// };

// const allServices = generateExtendedServices();

const filterServices = (services: Dapp[], filters: DappFilters): Dapp[] => {
  return services.filter((service) => {
    if (!service.visibility.languages.includes(filters.language)) {
      return false;
    }

    if (!service.visibility.platforms.includes(filters.platform)) {
      return false;
    }

    if (!service.visibility.environments.includes(filters.environment)) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const description = service.description[filters.language] || "";
      const searchableText = `${service.name} ${description}`.toLowerCase();
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DappApiResponse>
) {
  try {
    const {
      page = "1",
      limit = "20",
      language = "ko",
      platform = "ios",
      environment = process.env.NEXT_PUBLIC_BUILD_ENV,
      search = ""
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const filters: DappFilters = {
      language: language as "ko" | "en",
      platform: platform as "android" | "ios",
      environment: environment as "dev" | "stage" | "prod",
      searchQuery: search as string
    };

    const filteredServices = filterServices(mockDapps, filters);

    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);

    const hasMore = endIndex < filteredServices.length;

    res.status(200).json({
      success: true,
      data: paginatedServices,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredServices.length,
        hasMore
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      pagination: { page: 1, limit: 20, total: 0, hasMore: false }
    });
  }
}
