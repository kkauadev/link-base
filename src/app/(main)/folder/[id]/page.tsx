"use client";

import { LinkCard } from "@/components/cards/link-card";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";
import { Folder } from "@/types/user";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AiOutlineDelete as IconDelete,
  AiOutlinePlus as IconPlus,
} from "react-icons/ai";
import useSWR from "swr";

export default function FolderPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useSWR(
    `http://localhost:3333/folder/${id}`,
    (url) => {
      const stored = getUserToken();
      if (stored) {
        return fetcher<Folder>(url, stored.token, {
          method: "GET",
        });
      }
    },
    {
      revalidateOnMount: true,
    }
  );

  const deleteFolder = async () => {
    const stored = getUserToken();
    if (!stored) return console.log("Não há token");
    await fetcher(`http://localhost:3333/folders/delete/${id}`, stored.token, {
      method: "DELETE",
    }).then((data) => {
      if (data) router.push("/");
    });
  };

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar</p>}
      {data && !isLoading && (
        <>
          <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Pasta {data.name}</h1>
          <section className="flex gap-4 mt-10 mb-5">
            <ul className="flex flex-col items-center gap-4 w-full pr-6">
              {data.links?.map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
              {data.links?.length === 0 ||
                (!data.links && (
                  <li>
                    <span className="text-xl">
                      Nenhum link adicionado a pasta{" "}
                      <strong>{data.name}</strong> ainda
                    </span>
                  </li>
                ))}
            </ul>
            <aside className="max-w-md w-full">
              <section className="flex justify-between items-center gap-4 mb-4  ">
                <Link className="w-1/2" href={`/link/create/${data.id}`}>
                  <button className="w-full bg-green-600 flex items-center justify-center text-2xl px-2 py-1 rounded transition hover:brightness-75">
                    <IconPlus />
                  </button>
                </Link>
                <Link className="w-full" href={`/folder/edit/${id}`}>
                  <button
                    disabled={data.links?.length < 1}
                    className={`${
                      data.links?.length < 1 && "opacity-50 cursor-not-allowed"
                    } w-full bg-blue-600 px-2 py-1 rounded transition hover:brightness-75`}
                  >
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => deleteFolder()}
                  disabled={data.links?.length < 1}
                  className={`${
                    data.links?.length < 1 && "opacity-50 cursor-not-allowed"
                  } w-1/2 bg-red-600  flex items-center justify-center text-2xl px-2 py-1  rounded transition hover:brightness-75`}
                >
                  <IconDelete />
                </button>
              </section>
              <section className="flex flex-col gap-2 border-2 border-primary rounded p-4 ">
                <p>{data.description}</p>
                <p>Total de links: {data.links?.length}</p>
                <p>
                  Data de criação:{" "}
                  {data.createDate && dateFormatter(new Date(data.createDate))}
                </p>
                <p>
                  Data de última edição:{" "}
                  {relativeDateFormatter(new Date(data.updatedDate))}
                </p>
              </section>
            </aside>
          </section>
        </>
      )}
    </>
  );
}
