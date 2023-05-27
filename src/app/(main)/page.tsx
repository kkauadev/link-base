"use client";

import { FolderCard } from "@/components/cards/folder-card";
import { PageTitle } from "@/components/layouts/title-page";
import { baseUrl } from "@/constants/base-url";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [viewEditButton, setViewEditButton] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

  const { push } = useRouter();

  const stored = getUserToken();

  const { data, error } = useSWR(
    stored && `${baseUrl}/user/${stored.id}`,
    async (url) => {
      if (stored) {
        return (await fetcher(url, stored.token, {
          method: "GET",
        }).then((res) => res.json())) as User;
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  const loadingCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(
        <div
          key={i}
          className="w-full md:max-w-[36rem] lg:w-[calc(33.3%-2.5rem)] lg:min-w-[30rem] h-28 rounded bg-tertiary animate-pulse"
        />
      );
    }
    return cards;
  };

  return (
    <>
      <PageTitle title="Minhas pastas" />
      <section className="flex flex-col gap-4 mt-10 mb-5">
        <div className="text-sm sm:text-base flex gap-4">
          <button
            onClick={() => push("/folder/create")}
            className="h-[1.8rem] text-white w-24  rounded transition hover:brightness-75 bg-green-600"
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              setViewDeleteButton(false);
              setViewEditButton((prev) => !prev);
            }}
            disabled={data?.folders?.length === 0}
            className={`${
              data?.folders?.length === 0 && "opacity-50 cursor-not-allowed"
            } h-[1.8rem] text-white w-24  rounded transition hover:brightness-75 bg-blue-600`}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setViewEditButton(false);
              setViewDeleteButton((prev) => !prev);
            }}
            disabled={data?.folders?.length === 0}
            className={`${
              data?.folders?.length === 0 && "opacity-50 cursor-not-allowed"
            } h-[1.8rem] text-white w-24  rounded transition hover:brightness-75 bg-red-600`}
          >
            Excluir
          </button>
        </div>
        {data && (
          <div className="flex flex-wrap gap-4">
            {!data.folders ? (
              <p>Ainda não existe nenhuma página</p>
            ) : (
              data.folders.map(({ id, name, description, links }) => (
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
            )}
          </div>
        )}
        {!data && !error && (
          <div className="flex flex-wrap gap-4">
            {loadingCards().map((card) => {
              return <div key={card.key}>{card}</div>;
            })}
          </div>
        )}
        {error && (
          <p className="text-xl">
            Erro ao carregar as páginas, por favor volte mais tarde.
          </p>
        )}
      </section>
    </>
  );
}
