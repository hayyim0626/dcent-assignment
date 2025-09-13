import React from "react";
import Image from "next/image";
import { Banner } from "@/entities/banner/types";
import { useBannerList } from "@/entities/banner/hooks/useBannerList";
import { Carousel, Skeleton } from "@/shared/ui";

interface BannerCarouselProps {
  lang: "en" | "ko";
}

export function BannerCarousel({ lang }: BannerCarouselProps) {
  const { data: banners, isLoading, isError } = useBannerList();

  const handleBannerClick = (banner: Banner) => {
    if (banner[lang].ctaUrl) {
      window.open(banner[lang].ctaUrl, "_blank");
    }
  };

  const handleCtaClick = (e: React.MouseEvent, banner: Banner) => {
    e.stopPropagation();
    if (banner[lang].ctaUrl) {
      window.open(banner[lang].ctaUrl, "_blank");
    }
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <div className="w-full h-48 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center">
        <p className="text-red-600 text-sm">배너를 불러오는데 실패했습니다</p>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">배너가 없습니다</p>
      </div>
    );
  }

  return (
    <Carousel showCounter>
      {banners.map((banner) => (
        <div
          key={banner.id}
          onClick={() => handleBannerClick(banner)}
          className={
            "relative flex h-48 cursor-pointer items-center justify-center rounded-2xl bg-cover bg-center"
          }
        >
          <Image
            src={banner[lang].imageUrl}
            alt="Banner Carousel"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            loading="lazy"
          />
          <div className="relative p-8 z-10 flex h-full flex-col items-start text-white px-4">
            {banner[lang].description && (
              <h2 className="mt-2 text-lg whitespace-pre-line">
                {banner[lang].description}
              </h2>
            )}
            {banner[lang].ctaText && (
              <button
                onClick={(e) => handleCtaClick(e, banner)}
                className="mt-4 rounded-full bg-white px-9 py-1.5 text-sm font-semibold text-black hover:bg-gray-200"
              >
                {banner[lang].ctaText}
              </button>
            )}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
