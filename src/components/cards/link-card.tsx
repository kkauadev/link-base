"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

import {
  dateFormatter,
  relativeDateFormatter,
} from "@/utils/functions/date-formatter";
import { deleteData } from "@/services/delete-data";
import { Link as LinkType } from "@/types/user";
import { IconArrowDown, IconEllipsis } from "../icons";
import { ConfirmActionCard } from "./confirm-action-card";

interface LinkCardProps {
  link: LinkType;
  paramsId: string;
  stored: {
    token: string;
    id: string;
  };
}

export const LinkCard = ({ link, paramsId, stored }: LinkCardProps) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [viewDescription, setViewDescription] = useState(false);
  const [viewOptions, setViewOptions] = useState(false);
  const { refresh } = useRouter();
  const refOptionsMenu = useRef<HTMLUListElement>(null);

  const closeModal = (e: MouseEvent) => {
    if (refOptionsMenu.current?.contains(e.target as Node)) {
      return;
    }
    setViewOptions(false);
  };

  document.addEventListener("mousedown", closeModal);

  return (
    <>
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
            <ul
              ref={refOptionsMenu}
              className="bg-secondary absolute top-6 right-0 p-2 rounded shadow z-20"
            >
              <li className="flex items-center gap-2">
                <Link href={`/link/edit/${paramsId}/${link.id}` || "#"}>
                  <button className="text-white">Editar</button>
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <button
                  className="text-white"
                  onClick={() => {
                    setViewOptions(false);
                    setDeleteModalIsOpen(true);
                  }}
                >
                  Excluir
                </button>
              </li>
            </ul>
          )}
        </div>
        <Link
          className="text-secondary underline brightness-125 hover:brightness-100 break-words"
          href={link.link || "#"}
          target="_blank"
        >
          {link.link}
        </Link>
        {viewDescription && (
          <div className="flex flex-col gap-6 text-sm sm:text-base">
            <p className={`mt-1 `}>{link.description}</p>
            <ul>
              <li>
                Data de criação: {dateFormatter(new Date(link.createDate))}
              </li>
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
      <ConfirmActionCard
        handleClose={() => setDeleteModalIsOpen(false)}
        handleConfirm={() => deleteData(stored, link.id, "links", refresh)}
        isModalOpen={deleteModalIsOpen}
      />
    </>
  );
};
