"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { baseUrl } from "@/constants/base-url";
import { Folder } from "@/types/user";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default async function FolderEdit() {
  const [data, setData] = useState<Folder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const token = Cookies.get("token");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/folder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          next: {
            revalidate: 10,
          },
        });

        setData(await res.json());
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setData(null);
        setIsLoading(false);
        setError(true);
      }
    };
    getData();
  }, [id, token]);

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite a pasta</h1>
      <FormFolders
        finishBtnText="Editar"
        type="update"
        inputNameValue={data?.name}
        textareaDescriptionValue={data?.description}
        paramId={id}
        cookies={{ token: token ?? "" }}
      />
    </>
  );
}
