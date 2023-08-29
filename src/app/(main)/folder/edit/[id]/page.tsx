"use client";

import Cookies from "js-cookie";
import { useParams } from "next/navigation";

import { FormFolders } from "@/components/forms/form-folders";
import { MessageErrorLoad } from "@/components/messages/message-error-load";
import { baseUrl } from "@/utils/constants/base-url";
import { useGetData } from "@/hooks/get-data";
import { Folder } from "@/types/user";

export default function FolderEdit() {
  const { id } = useParams();
  const token = Cookies.get("token");

  const { data, isError, isLoading } = useGetData<Folder>(
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
      <MessageErrorLoad isOpen={isError} />
    </>
  );
}
