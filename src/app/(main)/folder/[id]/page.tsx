"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useParams } from "next/navigation";
import { memo } from "react";

import { DeleteFolderButton } from "@/components/buttons/delete-folder-button";
import { LinkCard } from "@/components/cards/link-card";
import { IconPlus } from "@/components/icons";
import { MessageErrorLoad } from "@/components/messages/message-error-load";
import { baseUrl } from "@/constants/base-url";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { useGetData } from "@/hooks/get-data";
import { Folder } from "@/types/user";

export default function FolderPage() {
  const { id: paramId } = useParams();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const { data, error, isLoading } = useGetData<Folder>(
    `${baseUrl}/folder/${paramId}`,
    token ?? ""
  );

  const MemoizedLinkCard = memo(LinkCard);

  return (
    <>
      {data && (
        <>
          <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
            Pasta {data?.name}
          </h1>
          <section className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row gap-4 mt-6 sm:mt-10 mb-5">
            <ul className="flex flex-col gap-4 w-full sm:pr-6">
              {data.links.length === 0 ? (
                <li className="text-xl">
                  Nenhum link adicionado a pasta <strong>{data.name}</strong>{" "}
                  ainda
                </li>
              ) : (
                data.links.map((link) => {
                  return (
                    <MemoizedLinkCard
                      key={link.id}
                      link={link}
                      paramsId={paramId}
                      stored={{ token: token ?? "", id: id ?? "" }}
                    />
                  );
                })
              )}
            </ul>
            <aside className="max-w-md w-full">
              <section className="flex justify-between items-center gap-4 mb-4">
                <Link
                  className="w-1/2 h-[2rem] text-white bg-green-600 flex items-center justify-center text-2xl px-2 py-1 rounded transition hover:brightness-75"
                  href={`/link/create/${data.id}`}
                >
                  <IconPlus />
                </Link>
                <Link
                  className="h-[2rem] text-center text-white w-full bg-blue-600 px-2 py-1 rounded transition hover:brightness-75"
                  href={`/folder/edit/${paramId}`}
                >
                  Editar
                </Link>
                <DeleteFolderButton
                  id={id ?? ""}
                  paramsId={paramId}
                  token={token ?? ""}
                />
              </section>
              <section className="text-sm sm:text-base flex flex-col gap-2 border-2 border-primary rounded p-3 sm:p-4">
                <p className="whitespace-normal break-words w-full">
                  {data.description}
                </p>
                <p>Total de links: {data.links.length}</p>
                <p>
                  Data de criação: {dateFormatter(new Date(data.createDate))}
                </p>
                <p>
                  Data de última edição:{" "}
                  {relativeDateFormatter(new Date(data.updatedDate))}
                </p>
              </section>
            </aside>
          </section>
        </>
      )}
      {isLoading && <p>Carregando...</p>}
      {error && <MessageErrorLoad />}
    </>
  );
}
