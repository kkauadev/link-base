"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
interface FolderCardProps {
  id: string;
  name: string;
  description: string;
  quantityOfLinks: number;
}

export const FolderCard = ({
  description,
  id,
  name,
  quantityOfLinks,
}: FolderCardProps) => {
  return (
    <article className="max-h-[9rem] flex flex-col justify-between relative break-words w-full md:max-w-[36rem] lg:w-[calc(33.3%-2.5rem)] lg:min-w-[30rem] py-4 px-5 rounded border-2 border-primary">
      <div>
        <div className="flex justify-between items-center mb-1">
          <Link
            href={`/folder/${id}`}
            className="text-xl font-bold text-secondary hover:underline line-clamp-1 mr-2"
          >
            {name}
          </Link>
        </div>
        <p className="line-clamp-2">{description}</p>
      </div>
      <div className="text-sm sm:text-base mt-1 cursor-default">
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
