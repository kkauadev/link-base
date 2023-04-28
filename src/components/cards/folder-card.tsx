"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AiOutlineClose as CloseIcon,
  AiOutlineEdit as EditIcon,
} from "react-icons/ai";

interface FolderCardProps {
  id: string;
  title: string;
  folderLink: string;
  description: string;
  quantityOfLinks?: number;
  viewButtons: {
    edit: boolean;
    delete: boolean;
  };
}

export const FolderCard = ({
  id,
  title,
  folderLink,
  description,
  quantityOfLinks,
  viewButtons,
}: FolderCardProps) => {
  const router = useRouter();

  return (
    <article className="relative w-full md:max-w-[36rem] lg:w-[calc(33.3%-2.5rem)] lg:min-w-[30rem] py-4 px-5 rounded border-2 border-primary">
      <div className="absolute top-[-1rem] right-[-1rem]">
        {viewButtons.delete && (
          <button
            onClick={() => router.refresh()}
            className="w-8 h-8 flex justify-center items-center rounded-full  bg-red-600 transition hover:brightness-75"
          >
            <CloseIcon className="text-lg" />
          </button>
        )}
        {viewButtons.edit && (
          <button
            onClick={() => router.push(`/folder/edit/${id}`)}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-600 transition hover:brightness-75"
          >
            <EditIcon className="text-lg" />
          </button>
        )}
      </div>
      <Link
        href={`/${folderLink}`}
        className="text-xl font-bold text-secondary hover:underline"
      >
        {title}
      </Link>
      <p>{description}</p>
      {quantityOfLinks && (
        <div className="mt-1">
          <span className="text-zinc-400">
            Quantidade de links: {quantityOfLinks}
          </span>
        </div>
      )}
    </article>
  );
};
