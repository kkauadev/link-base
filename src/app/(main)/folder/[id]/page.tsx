"use client";

import { DeleteFolderButton } from "@/components/buttons/delete-folder-button";
import { LinkCard } from "@/components/cards/link-card";
import { baseUrl } from "@/constants/base-url";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { Folder } from "@/types/user";
import Link from "next/link";
import { AiOutlinePlus as IconPlus } from "react-icons/ai";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default async function FolderPage() {
  const [data, setData] = useState<Folder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id: paramId } = useParams();

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/folder/${paramId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: {
            revalidate: 10,
          },
        });

        setData(await res.json());
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setData(null);
        setIsLoading(false);
        setError(true);
      }
    };
    getData();
  }, [id, token, paramId]);

  return (
    <>
      {data && (
        <>
          <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
            Pasta {data.name}
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
                  return <LinkCard key={link.id} link={link} />;
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
      {error && (
        <div className="text-xl">
          <p>Erro ao carregar dados</p>
        </div>
      )}
      {isLoading && (
        <div className="text-xl">
          <p>Carregando...</p>
        </div>
      )}
    </>
  );
}
