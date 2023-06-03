"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { baseUrl } from "@/constants/base-url";
import { useGetData } from "@/hooks/get-data";
import { Folder } from "@/types/user";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default async function FolderEdit() {
  const { id } = useParams();
  const token = Cookies.get("token");

  const { data, error, isLoading } = useGetData<Folder>(
    `${baseUrl}/folder/${id}`,
    token ?? ""
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
          paramId={id}
          cookies={{ token: token ?? "" }}
        />
      )}
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar</p>}
    </>
  );
}
