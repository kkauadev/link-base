"use client";

import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { getUserToken } from "@/functions/get-user-token";
import { deleteData } from "@/services/delete-data";
import { Link as LinkType } from "@/types/user";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AiOutlineCaretDown as IconArrowDown,
  AiOutlineEllipsis as IconEllipsis,
} from "react-icons/ai";

interface LinkCardProps {
  link: LinkType;
}

export const LinkCard = ({ link }: LinkCardProps) => {
  const [viewDescription, setViewDescription] = useState(false);
  const [viewOptions, setViewOptions] = useState(false);
  const { refresh } = useRouter();
  const { id } = useParams();
  const stored = getUserToken();

  return (
    <li className="max-w-5xl w-full bg-tertiary p-4 rounded">
      <div className="flex justify-between items-center relative">
        <h6 className="text-lg mb-2">{link.title}</h6>
        <button
          onClick={() => setViewOptions((prev) => !prev)}
          className="text-white text-3xl"
        >
          <IconEllipsis />
        </button>
        {viewOptions && (
          <ul className="bg-secondary absolute top-6 right-0 p-2 rounded shadow">
            <li className="flex items-center gap-2">
              <Link href={`/link/edit/${id}/${link.id}` || "#"}>
                <button className="text-white">Editar</button>
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <button
                className="text-white"
                onClick={() => deleteData(stored, link.id, refresh, "links")}
              >
                Excluir
              </button>
            </li>
          </ul>
        )}
      </div>
      <Link
        className="text-secondary underline brightness-125 hover:brightness-100"
        href={link.link || "#"}
      >
        {link.link}
      </Link>
      {viewDescription && (
        <div className="flex flex-col gap-6 text-sm sm:text-base">
          <p className={`break-words mt-1 `}>{link.description}</p>
          <ul>
            <li>Data de criação: {dateFormatter(new Date(link.createDate))}</li>
            <li>
              Data da última edição:{" "}
              {relativeDateFormatter(new Date(link.updatedDate))}
            </li>
          </ul>
        </div>
      )}
      <button
        onClick={() => setViewDescription((prev) => !prev)}
        className="text-sm sm:text-base text-white mt-2 flex gap-1 items-center py-1 "
      >
        <IconArrowDown className={`${viewDescription && "rotate-180"}`} />
        <span>Descrição</span>
      </button>
    </li>
  );
};
