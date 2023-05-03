"use client";

import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineCaretDown as IconArrowDown,
  AiOutlineEllipsis as IconEllipsis,
} from "react-icons/ai";

interface LinkCardProps {
  title: string;
  link: string;
  description: string;
  id: string;
}

export const LinkCard = ({ description, id, link, title }: LinkCardProps) => {
  const [viewDescription, setViewDescription] = useState(false);
  const [viewOptions, setViewOptions] = useState(false);
  const { refresh } = useRouter();

  const deleteLink = async () => {
    const stored = getUserToken();
    if (!stored) return console.log("Não há token");
    await fetcher(`http://localhost:3333/links/delete/${id}`, stored.token, {
      method: "DELETE",
    }).then(() => {
      refresh();
    });
  };

  return (
    <li className="w-full bg-tertiary p-4 rounded">
      <div className="flex justify-between items-center relative">
        <h6 className="text-lg mb-2">{title}</h6>
        <button
          onClick={() => setViewOptions((prev) => !prev)}
          className="text-3xl"
        >
          <IconEllipsis />
        </button>
        {viewOptions && (
          <ul className="bg-secondary absolute top-6 right-0 p-2 rounded shadow">
            <li className="flex items-center gap-2">
              <Link href={`/link/edit/${id}`}>
                <button>Editar</button>
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <button onClick={() => deleteLink()}>Excluir</button>
            </li>
          </ul>
        )}
      </div>
      <Link
        className="text-secondary underline brightness-125 hover:brightness-100"
        href={link}
      >
        {link}
      </Link>
      {viewDescription && <p className={` mt-1 `}>{description}</p>}
      <button
        onClick={() => setViewDescription((prev) => !prev)}
        className="mt-2 flex gap-1 items-center py-1 "
      >
        <IconArrowDown className={`${viewDescription && "rotate-180"}`} />
        <span>Descrição</span>
      </button>
    </li>
  );
};
