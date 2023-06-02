"use client";

import { FormLink } from "@/components/forms/form-link";
import { baseUrl } from "@/constants/base-url";
import { Link } from "@/types/user";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function FolderEdit() {
  const [data, setData] = useState<Link | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();
  const token = Cookies.get("token");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/links/${id}`, {
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
        return data;
      } catch (error) {
        setData(null);
        setIsLoading(false);
        setError(true);
      }
    };
    getData();
  }, [id, data, token]);

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
