"use client";

import { FolderCard } from "@/components/cards/folder-card";
import { getUserToken } from "@/functions/get-user-token";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../functions/fetcher-data";
import { PageTitle } from "../../components/layouts/title-page";

export default function Home() {
  const [viewEditButton, setViewEditButton] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

  const router = useRouter();

  const stored = getUserToken();

  const url = stored && `http://localhost:3333/user/${stored.id}`;

  const { data, isLoading, error } = useSWR(
    url,
    (url) => {
      if (stored) {
        return fetcher<User>(url, stored.token, {
          method: "GET",
        });
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <PageTitle title="Minhas pastas" />
      <section className="flex flex-col gap-4 mt-10 mb-5">
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/folder/create")}
            className="text-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-green-600"
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              setViewDeleteButton(false);
              setViewEditButton((prev) => !prev);
            }}
            disabled={data?.folders.length === 0}
            className={`${
              data?.folders.length === 0 && "opacity-50 cursor-not-allowed"
            } text-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-blue-600`}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setViewEditButton(false);
              setViewDeleteButton((prev) => !prev);
            }}
            disabled={data?.folders.length === 0}
            className={`${
              data?.folders.length === 0 && "opacity-50 cursor-not-allowed"
            } text-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-red-600`}
          >
            Excluir
          </button>
        </div>
        {data?.folders.length != 0 ? (
          data?.folders?.map(({ id, name, description, links }) => (
            <FolderCard
              key={id}
              data={{
                id,
                name,
                description,
                quantityOfLinks: links.length,
              }}
              viewButtons={{
                edit: viewEditButton,
                delete: viewDeleteButton,
              }}
            />
          ))
        ) : (
          <p>Ainda não existe nenhuma página</p>
        )}
        {isLoading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar</p>}
      </section>
    </>
  );
}
