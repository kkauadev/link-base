"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import { Folder } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();
  const { data, error } = useSWR(
    `http://localhost:3333/folder/${id}`,
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
            url: `http://localhost:3333/folders/update/${id}`,
            options: { method: "PUT" },
            token: stored.token,
          }}
          inputNameValue={data.name}
          textareaDescriptionValue={data.description}
        />
      )}
    </>
  );
}