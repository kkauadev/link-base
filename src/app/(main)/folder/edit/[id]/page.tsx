"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { baseUrl } from "@/constants/base-url";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import { Folder } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();

  const { data } = useSWR(
    `${baseUrl}/folder/${id}`,
    async (url) => {
      if (stored) {
        return (await fetcher(url, stored.token, {
          method: "GET",
        }).then((res) => res.json())) as Folder;
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite a pasta</h1>
      {data && stored && (
        <FormFolders
          fetch={{
            url: `${baseUrl}/folders/update/${id}`,
            options: { method: "PUT" },
            token: stored.token,
          }}
          finishBtnText="Editar"
          inputNameValue={data.name}
          textareaDescriptionValue={data.description}
        />
      )}
    </>
  );
}
