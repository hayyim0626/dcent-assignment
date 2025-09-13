import React, { useState, useEffect } from "react";
import { Service } from "@/entities/service/types";
import Image from "next/image";

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Service;
  language: "ko" | "en";
}

export function BottomSheetModal({
  isOpen,
  onClose,
  data,
  language
}: BottomSheetModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleOpenService = () => {
    if (data?.url) {
      window.open(data.url, "_blank");
    }
  };

  if (!isOpen || !data) return null;

  const description =
    data.description[language] ||
    data.description.ko ||
    data.description.en ||
    "";

  return (
    <div className="fixed inset-0 z-50 flex justify-center max-w-[480px] mx-auto">
      <div
        className={`absolute inset-0 bg-transparent duration-300 bg-opacity-10`}
        onClick={handleOverlayClick}
      />

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div
          className={`w-full bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out ${
            isAnimating ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center space-x-4">
              <Image
                src={data.iconUrl}
                alt={data.name}
                width={64}
                height={64}
                loading="lazy"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{data.name}</h2>
                {data.networks && data.networks.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.networks.map((network) => (
                      <span
                        key={network}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {network}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-600"
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
          </div>
          {data.url && (
            <div className="px-6 pb-4">
              <p className="text-sm text-blue-600 break-all">{data.url}</p>
            </div>
          )}
          <div className="h-px bg-gray-200 mx-6" />
          <div className="px-6 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          {data.url && (
            <div className="px-6 pb-8">
              <button
                onClick={handleOpenService}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-colors duration-200"
              >
                서비스 바로가기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
