"use client";

import { FormLink } from "@/components/forms/form-link";
import { baseUrl } from "@/constants/base-url";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import { Link } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();
  const { data } = useSWR(
    `${baseUrl}/links/${id}`,
    async (url) => {
      if (stored) {
        return (await fetcher(url, stored.token, {
          method: "GET",
        }).then((res) => res.json())) as Link;
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
        <FormLink
          fetch={{
            url: `${baseUrl}/links/update/`,
            options: { method: "PUT" },
            token: stored.token,
          }}
          inputTitleValue={data.title}
          inputLinkValue={data.link}
          textareaDescriptionValue={data.description}
        />
      )}
    </>
  );
}
