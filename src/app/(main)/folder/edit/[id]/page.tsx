"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";
import { Folder } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();

  // async (url) => {
  //   if (stored) {
  //     return (await fetcher(url, stored.token, {
  //       method: "GET",
  //     }).then((res) => res.json())) as Folder;
  //   }
  // };

  const { data, isLoading, error } = useSWR(
    `${baseUrl}/folder/${id}`,
    async (url) => {
      if (stored) {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${stored.token}`,
          },
        });

        const data = await res.json();

        return data as Folder;
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite a pasta</h1>
      {data && (
        <FormFolders
          finishBtnText="Editar"
          type="update"
          inputNameValue={data?.name}
          textareaDescriptionValue={data?.description}
          placeholders={isLoading ? "Carregando..." : "Digite aqui"}
        />
      )}
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar</p>}
    </>
  );
}
