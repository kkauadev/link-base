"use client";

import { FolderCard } from "@/components/cards/folder-card";
import { baseUrl } from "@/constants/base-url";
import { User } from "@/types/user";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${baseUrl}/user/${id}`, {
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
      <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
        Minhas pastas
      </h1>
      <section className="flex flex-col gap-4 mt-10 mb-5">
        <div>
          {data && (
            <Link
              href={`/folder/create/${token}`}
              className={`w-[10rem] px-4 py-2 items-center flex gap-4 text-white rounded transition hover:brightness-75 bg-green-600`}
            >
              <span>Criar nova pasta</span>
            </Link>
          )}
        </div>
        {data && (
          <div className="flex flex-wrap gap-4">
            {data.folders ? (
              data.folders.map(({ id: folderId, name, description, links }) => {
                const quantityOfLinks = links.length;
                return (
                  <FolderCard
                    key={folderId}
                    description={description}
                    id={folderId}
                    name={name}
                    quantityOfLinks={quantityOfLinks}
                  />
                );
              })
            ) : (
              <p>Ainda não existe nenhuma página</p>
            )}
          </div>
        )}
        {isLoading && <p>Carregando...</p>}
        {error && <p>Erro ao carregar dados</p>}
      </section>
    </>
  );
}
