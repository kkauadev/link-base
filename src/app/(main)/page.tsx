"use client";

import { FolderCard } from "@/components/cards/folder-card";
import { loadingCards } from "@/components/cards/loading-cards";
import { PageTitle } from "@/components/layouts/title-page";
import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function Home() {
  const [viewEditButton, setViewEditButton] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

  const { push } = useRouter();

  const stored = getUserToken();

  const { data, error, isLoading } = useSWR(
    stored && `${baseUrl}/user/${stored.id}`,
    async (url) => {
      if (stored) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${stored.token}`,
          },
        });

        const data = await res.json();

        return data as User;
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  const isDisabled = data?.folders?.length === 0;

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
            disabled={isDisabled}
            className={`${
              isDisabled && "opacity-50 cursor-not-allowed"
            } h-[1.8rem] text-white w-24  rounded transition hover:brightness-75 bg-blue-600`}
          >
            Editar
          </button>
          <button
            onClick={() => {
              setViewEditButton(false);
              setViewDeleteButton((prev) => !prev);
            }}
            disabled={isDisabled}
            className={`${
              isDisabled && "opacity-50 cursor-not-allowed"
            } h-[1.8rem] text-white w-24  rounded transition hover:brightness-75 bg-red-600`}
          >
            Excluir
          </button>
        </div>
        {data && (
          <div className="flex flex-wrap gap-4">
            {data.folders ? (
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
            ) : (
              <p>Ainda não existe nenhuma página</p>
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
