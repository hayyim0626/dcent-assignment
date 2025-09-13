import React, { useEffect, useState } from "react";
import { ServiceItem } from "@/entities/service/ui/item";
import { Service } from "@/entities/service/types";
import { useServiceList } from "@/entities/service/hooks/useServiceList";
import { useVirtualList, useSearch } from "@/shared/hooks";
import { ListLoader } from "@/shared/ui";
import { detectLanguage, detectPlatform } from "@/shared/config/environment";
import { BottomSheetModal } from "./bottomSheet";

export function ServiceList() {
  const [currentLanguage, setCurrentLanguage] = useState<"ko" | "en">("ko");
  const [currentPlatform, setCurrentPlatform] = useState<"android" | "ios">(
    "ios"
  );
  const { searchQuery, debouncedQuery, handleSearchChange, clearSearch } =
    useSearch();

  useEffect(() => {
    setCurrentLanguage(detectLanguage());
    setCurrentPlatform(detectPlatform());
  }, []);

  const {
    data: servicesData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useServiceList({
    language: currentLanguage,
    platform: currentPlatform,
    environment: process.env.NEXT_PUBLIC_BUILD_ENV as "dev" | "stage" | "prod",
    searchQuery: debouncedQuery
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { loadMoreRef, flattenedItems } = useVirtualList({
    data: servicesData?.pages || [],
    hasNextPage: hasNextPage || false,
    fetchNextPage,
    isFetchingNextPage
  });

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setSelectedService(null);
    }, 300);
  };

  if (isError) {
    return (
      <div className={`w-full p-4 bg-red-50 border border-red-200 rounded-xl`}>
        <p className="text-red-600 text-sm text-center">
          서비스 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full`}>
      <div className="border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 pb-2">목록</h1>
      </div>
      <div className="pt-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="서비스 이름이나 설명으로 검색..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-nonetext-base text-black"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {isLoading && (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <ListLoader key={index} />
            ))}
          </>
        )}

        {!isLoading &&
          flattenedItems.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              language={currentLanguage}
              onClick={handleServiceClick}
            />
          ))}

        {!isLoading && flattenedItems.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">
              조건에 맞는 서비스가 없습니다.
            </p>
          </div>
        )}

        {/* 무한 스크롤 트리거 */}
        <div ref={loadMoreRef} className="h-4">
          {isFetchingNextPage && (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <ListLoader key={`loading-${index}`} />
              ))}
            </>
          )}
        </div>
      </div>
      <BottomSheetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedService as Service}
        language="ko"
      />
    </div>
  );
}
