"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { memo } from "react";

import { Button } from "@/components/buttons/button";
import { LinkCard } from "@/components/cards/link-card";
import { IconDelete, IconPlus } from "@/components/icons";
import { MessageErrorLoad } from "@/components/messages/message-error-load";
import { baseUrl } from "@/constants/base-url";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { useGetData } from "@/hooks/get-data";
import { deleteData } from "@/services/delete-data";
import { Folder } from "@/types/user";

type handleDeleteType = (
  id: string | undefined,
  token: string | undefined,
  paramsId: string | undefined
) => Promise<void>;

const linkStyle =
  "h-8 w-full flex items-center justify-center text-xl p-2 rounded transition hover:brightness-75";

export default function FolderPage() {
  const { id: routeParameterId } = useParams();
  const { push } = useRouter();
  const cookieId = Cookies.get("id");
  const cookieToken = Cookies.get("token");

  const { data, error, isLoading } = useGetData<Folder>(
    `${baseUrl}/folder/${routeParameterId}`,
    cookieToken ?? ""
  );

  const MemoizedLinkCard = memo(LinkCard);

  const handleDelete: handleDeleteType = async (id = "", tk = "", prmId = "") =>
    await deleteData({ id, token: tk }, prmId, "folders").then(() => push("/"));

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
                      paramsId={routeParameterId}
                      stored={{ token: cookieToken ?? "", id: cookieId ?? "" }}
                    />
                  );
                })
              )}
            </ul>
            <aside className="max-w-md w-full">
              <section className="flex justify-between items-center gap-4 mb-4">
                <Link
                  className={`${linkStyle} bg-green-600`}
                  href={`/link/create/${data.id}`}
                >
                  <IconPlus />
                </Link>
                <Link
                  className={`${linkStyle} bg-blue-600`}
                  href={`/folder/edit/${routeParameterId}`}
                >
                  Editar
                </Link>
                <Button
                  onClick={() =>
                    handleDelete(cookieId, routeParameterId, cookieToken)
                  }
                  id="delete-folder-button"
                  className="h-8 text-xl text-white bg-red-600"
                >
                  <IconDelete />
                </Button>
              </section>
              <section className="text-sm sm:text-base flex flex-col gap-2 border-2 border-primary rounded p-3 sm:p-4">
                <p className="whitespace-normal w-full">{data.description}</p>
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
