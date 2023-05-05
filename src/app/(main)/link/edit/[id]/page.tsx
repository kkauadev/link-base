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
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl border border-white">
        Edite a pasta
      </h1>
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
