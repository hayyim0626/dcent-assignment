import React from "react";
import Image from "next/image";
import { Service } from "@/entities/service/types";

interface ServiceListProps {
  service: Service;
  language: "ko" | "en";
  onClick?: (service: Service) => void;
}

export function ServiceItem({ service, language, onClick }: ServiceListProps) {
  const description =
    service.description[language] ||
    service.description.en ||
    service.description.ko ||
    "";

  const handleClick = () => {
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
