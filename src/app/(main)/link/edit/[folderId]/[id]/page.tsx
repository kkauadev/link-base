"use client";

import { FormLink } from "@/components/forms/form-link";
import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";
import { getData } from "@/services/get-data";
import { Link } from "@/types/user";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function FolderEdit() {
  const { id } = useParams();
  const stored = getUserToken();

  const { data } = useSWR(
    `${baseUrl}/links/${id}`,
    (url) => getData<Link>(url, stored),
    {
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite o link</h1>
      {data && stored && (
        <FormLink
          finishBtnText="Editar"
          type="update"
          inputTitleValue={data.title}
          inputLinkValue={data.link}
          textareaDescriptionValue={data.description}
        />
      )}
    </>
  );
}
