import React from "react";
import Image from "next/image";
import { Dapp } from "@/entities/dapp/types";
import { Skeleton } from "@/shared/ui";

interface DappListProps {
  service: Dapp;
  language: "ko" | "en";
  onClick?: (service: Dapp) => void;
}

export function DappItem({ service, language, onClick }: DappListProps) {
  const description =
    service.description[language] ||
    service.description.en ||
    service.description.ko ||
    "";

  const handleClick = () => {
    // if (service.url) {
    //   window.open(service.url, "_blank");
    // }
    onClick?.(service);
  };

  return (
    <div
      className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <Image src={service.iconUrl} width={48} height={48} alt="img" />
      <div>
        <h3 className="font-semibold text-gray-900 truncate text-base">
          {service.name}
        </h3>
        <div className="flex items-center justify-between mb-1"></div>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export const DappItemSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4 p-4">
    <Skeleton className="w-12 h-12 rounded-xl" />
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex space-x-2">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
    </div>
  </div>
);
