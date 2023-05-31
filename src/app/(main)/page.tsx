"use client";

import { FolderCard } from "@/components/cards/folder-card";
import { loadingCards } from "@/components/cards/loading-cards";
import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";
import { getData } from "@/services/get-data";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";
import useSWR from "swr";
import { HomeButton } from "../../components/buttons/home-button";

export default function Home() {
  const [viewEditButton, setViewEditButton] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

  const { push } = useRouter();

  const stored = getUserToken();

  const { data, error } = useSWR(
    stored && `${baseUrl}/user/${stored.id}`,
    (url) => getData<User>(url, stored, "homepage")
  );

  const isDisabled = data?.folders?.length === 0;

  const MemoizedFolderCard = memo(FolderCard);

  return (
    <>
      <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
        Minhas pastas
      </h1>
      <section className="flex flex-col gap-4 mt-10 mb-5">
        <div className="text-sm sm:text-base flex gap-4">
          <HomeButton
            color="green"
            text="Adicionar"
            onClick={() => push(`/folder/create/${stored?.id}`)}
          />
          <HomeButton
            color="blue"
            text="Editar"
            isDisabled={isDisabled}
            onClick={() => {
              setViewDeleteButton(false);
              setViewEditButton((prev) => !prev);
            }}
          />
          <HomeButton
            color="red"
            text="Excluir"
            isDisabled={isDisabled}
            onClick={() => {
              setViewEditButton(false);
              setViewDeleteButton((prev) => !prev);
            }}
          />
        </div>
        {data && (
          <div className="flex flex-wrap gap-4">
            {data.folders ? (
              data.folders.map(({ id, name, description, links }) => {
                const quantityOfLinks = links.length;

                return (
                  <MemoizedFolderCard
                    key={id}
                    data={{
                      id,
                      name,
                      description,
                      quantityOfLinks,
                    }}
                    viewButtons={{
                      edit: viewEditButton,
                      delete: viewDeleteButton,
                    }}
                  />
                );
              })
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
