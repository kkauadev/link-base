"use client";

import { deleteItem } from "@/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineClose as CloseIcon,
  AiOutlineEdit as EditIcon,
} from "react-icons/ai";

interface FolderCardProps {
  data: {
    id: string;
    name: string;
    description: string;
    quantityOfLinks?: number;
  };
  viewButtons: {
    edit: boolean;
    delete: boolean;
  };
}

export const FolderCard = ({
  data: { id, name, description, quantityOfLinks },
  viewButtons,
}: FolderCardProps) => {
  const { refresh, push } = useRouter();

  const deleteFolder = async () => {
    await deleteItem({ id, type: "folders" }).then((data) => {
      if (data) refresh();
    });
  };

  return (
    <article className="break-words relative w-full md:max-w-[36rem] lg:w-[calc(33.3%-2.5rem)] lg:min-w-[30rem] py-4 px-5 rounded border-2 border-primary">
      <div className="absolute top-[-1rem] right-[-1rem]">
        {viewButtons.delete && (
          <button
            onClick={() => deleteFolder()}
            className="text-white w-8 h-8 flex justify-center items-center rounded-full  bg-red-600 transition hover:brightness-75"
          >
            <CloseIcon className="text-lg" />
          </button>
        )}
        {viewButtons.edit && (
          <button
            onClick={() => push(`/folder/edit/${id}`)}
            className="text-white w-8 h-8 flex justify-center items-center rounded-full bg-blue-600 transition hover:brightness-75"
          >
            <EditIcon className="text-lg" />
          </button>
        )}
      </div>
      <Link
        href={`/folder/${id}`}
        className="text-xl font-bold text-secondary hover:underline"
      >
        {name}
      </Link>
      <p>{description}</p>
      <div className="text-sm sm:text-base  mt-1 cursor-default">
        {quantityOfLinks ? (
          <span className="text-zinc-400">
            Quantidade de links: {quantityOfLinks}
          </span>
        ) : (
          <span className="text-zinc-400">Nenhum link adicionado</span>
        )}
      </div>
    </article>
  );
};
