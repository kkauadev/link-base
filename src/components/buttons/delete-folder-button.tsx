"use client";

import { AiOutlineDelete as IconDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface DeleteFolderButtonProps {
  onClickMap: Record<"click", () => void>;
}

export const DeleteFolderButton = ({ onClickMap }: DeleteFolderButtonProps) => {
  const { push } = useRouter();

  const handleDelete = () => {
    const onClose = onClickMap["click"];
    if (onClose) {
      onClose();
      push("/");
    }
  };
  return (
    <button
      onClick={handleDelete}
      id="delete-folder-button"
      className={`h-[2rem] text-white w-1/2 bg-red-600  flex items-center justify-center text-2xl px-2 py-1  rounded transition hover:brightness-75`}
    >
      <IconDelete />
    </button>
  );
};
