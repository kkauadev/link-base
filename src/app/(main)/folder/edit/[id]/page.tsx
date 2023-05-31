"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";
import { getData } from "@/services/get-data";
import { Folder } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();

  const { data, isLoading, error } = useSWR(
    `${baseUrl}/folder/${id}`,
    (url) => getData<Folder>(url, stored, "editfolderpage" + id),
    {
      revalidateOnMount: false,
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
