import React, { useState } from "react";
import Image from "next/image";
import { useFavorite } from "@/entities/favorite/hooks";
import { FavoriteItem } from "@/entities/favorite/types";
import { DappItemSkeleton } from "@/entities/dapp/ui/item";
import { useDeleteFavorite } from "@/features/favorite/hooks";
import { ConfirmModal } from "./modal";

export function FavoriteList() {
  const { data: favorites = [], isLoading, isError } = useFavorite();
  const deleteFavoriteMutation = useDeleteFavorite();
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    itemToDelete: string | null;
  }>({
    isOpen: false,
    itemToDelete: null
  });

  const handleDeleteClick = (id: string) => {
    setConfirmModal({
      isOpen: true,
      itemToDelete: id
    });
  };

  const handleConfirmDelete = () => {
    if (confirmModal.itemToDelete) {
      deleteFavoriteMutation.mutate(confirmModal.itemToDelete, {
        onSuccess: () => {
          setConfirmModal({ isOpen: false, itemToDelete: null });
        },
        onError: () => {
          alert("삭제 중 오류가 발생했습니다.");
          setConfirmModal({ isOpen: false, itemToDelete: null });
        }
      });
    }
  };

  const handleCancelDelete = () => {
    setConfirmModal({ isOpen: false, itemToDelete: null });
  };

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <DappItemSkeleton key={`loading-${index}`} />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center">
        <p className="text-red-600 text-sm">
          즐겨찾기 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[480px]">
      <div className="border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900 pb-2">즐겨찾기</h1>
      </div>
      <div className="divide-y divide-gray-100">
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-sm p-12 text-center">
            즐겨찾기한 서비스가 없습니다.
          </p>
        ) : (
          favorites.map((item: FavoriteItem) => (
            <div
              key={item.id}
              className="flex items-center p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center flex-1 cursor-pointer">
                <Image
                  src={item.iconUrl}
                  width={48}
                  height={48}
                  alt="img"
                  className="mr-4"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate max-w-[334px]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-blue-600 truncate">{item.url}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="ml-3 p-2 text-gray-400"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="즐겨찾기 삭제"
        message="즐겨찾기 목록에서 삭제 하시겠습니까?"
      />
    </div>
  );
}
