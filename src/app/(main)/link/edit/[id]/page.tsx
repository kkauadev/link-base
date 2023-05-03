"use client";

import { FormLink } from "@/components/forms/form-link";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import { Link } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();
  const { data, error } = useSWR(
    `http://localhost:3333/links/${id}`,
    (url) => {
      if (stored) {
        return fetcher<Link>(url, stored.token, {
          method: "GET",
        });
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <h1 className="text-3xl">Edite a pasta</h1>
      {data && stored && (
        <FormLink
          fetch={{
            url: `http://localhost:3333/links/update/`,
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
