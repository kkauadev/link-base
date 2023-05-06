"use client";

import { baseUrl } from "@/constants/base-url";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
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
    const stored = getUserToken();
    if (!stored) return console.log("Não há token");
    console.log(id);
    await fetcher(`http://localhost:3333/folders/delete/${id}`, stored.token, {
      method: "DELETE",
    }).then((data) => {
      if (data) refresh();
    });
  };

  const deleteFolder = async () => {
    await deleteItem(`${baseUrl}/folders/delete/${id}`).then((data) => {
      if (data) refresh();
    });
  };

  return (
    <article className="relative w-full md:max-w-[36rem] lg:w-[calc(33.3%-2.5rem)] lg:min-w-[30rem] py-4 px-5 rounded border-2 border-primary">
      <div className="absolute top-[-1rem] right-[-1rem]">
        {viewButtons.delete && (
          <button
            onClick={() => deleteFolder()}
            className="w-8 h-8 flex justify-center items-center rounded-full  bg-red-600 transition hover:brightness-75"
          >
            <CloseIcon className="text-lg" />
          </button>
        )}
        {viewButtons.edit && (
          <button
            onClick={() => push(`/folder/edit/${id}`)}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-600 transition hover:brightness-75"
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
      <div className="mt-1 cursor-default">
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
