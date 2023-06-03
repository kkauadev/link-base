"use client";

import { FormLink } from "@/components/forms/form-link";
import { baseUrl } from "@/constants/base-url";
import { useGetData } from "@/hooks/get-data";
import { Link } from "@/types/user";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

export default function FolderEdit() {
  const { id } = useParams();
  const token = Cookies.get("token");

  const { data, error, isLoading } = useGetData<Link>(
    `${baseUrl}/links/${id}`,
    token ?? ""
  );

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite o link</h1>
      {data && (
        <FormLink
          finishBtnText="Editar"
          type="update"
          inputTitleValue={data.title}
          inputLinkValue={data.link}
          textareaDescriptionValue={data.description}
        />
      )}
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar</p>}
    </>
  );
}
