"use client";

import { deleteData } from "@/services/delete-data";
import { useRouter } from "next/navigation";
import { AiOutlineDelete as IconDelete } from "react-icons/ai";

interface DeleteFolderButtonProps {
  id: string;
  token: string;
  paramsId: string;
}

export const DeleteFolderButton = ({
  id,
  paramsId,
  token,
}: DeleteFolderButtonProps) => {
  const { push } = useRouter();

  const handleDelete = async () => {
    await deleteData({ id: id, token: token }, paramsId, "folders").then(() => {
      push("/");
    });
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
