"use client";

import { LinkCard } from "@/components/cards/link-card";
import { loadingCards } from "@/components/cards/loading-cards";
import { baseUrl } from "@/constants/base-url";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { getUserToken } from "@/functions/get-user-token";
import { deleteData } from "@/services/delete-data";
import { getData } from "@/services/get-data";
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
  const { push } = useRouter();

  const stored = getUserToken();

  const { data, error } = useSWR(
    `${baseUrl}/folder/${id}`,
    (url) => getData<Folder>(url, stored, `folderpage${id}}`),
    {
      revalidateOnMount: false,
    }
  );

  const handleDelete = async () => {
    await deleteData(stored, id, () => push("/"), "folders");
  };

  return (
    <>
      {data ? (
        <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
          Pasta {data?.name}
        </h1>
      ) : (
        <h1 className="text-xl sm:text-3xl">Carregando...</h1>
      )}
      <section className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row gap-4 mt-6 sm:mt-10 mb-5">
        <ul className="flex flex-col gap-4 w-full sm:pr-6">
          {data?.links?.length !== 0 && (
            <>
              {data?.links?.map((link) => {
                return <LinkCard key={link.id} link={link} />;
              })}
            </>
          )}
          {data?.links?.length === 0 && (
            <li className="text-xl">
              Nenhum link adicionado a pasta <strong>{data?.name}</strong> ainda
            </li>
          )}
          {!data &&
            !error &&
            loadingCards().map((card) => {
              return <div key={card.key}>{card}</div>;
            })}
        </ul>
        <aside className="max-w-md w-full">
          <section className="flex justify-between items-center gap-4 mb-4">
            <Link className="w-1/2" href={`/link/create/${data?.id}`}>
              <button className="h-[2rem] text-white w-full bg-green-600 flex items-center justify-center text-2xl px-2 py-1 rounded transition hover:brightness-75">
                <IconPlus />
              </button>
            </Link>
            <Link className="w-full" href={`/folder/edit/${id}`}>
              <button
                className={`h-[2rem] text-white w-full bg-blue-600 px-2 py-1 rounded transition hover:brightness-75`}
              >
                Editar
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className={`h-[2rem] text-white w-1/2 bg-red-600  flex items-center justify-center text-2xl px-2 py-1  rounded transition hover:brightness-75`}
            >
              <IconDelete />
            </button>
          </section>
          <section className="text-sm sm:text-base flex flex-col gap-2 border-2 border-primary rounded p-3 sm:p-4">
            <p>{data?.description}</p>
            <p>Total de links: {data?.links?.length}</p>
            <p>
              Data de criação:{" "}
              {data?.createDate && dateFormatter(new Date(data.createDate))}
            </p>
            <p>
              Data de última edição:{" "}
              {data?.createDate &&
                relativeDateFormatter(new Date(data.updatedDate))}
            </p>
          </section>
        </aside>
      </section>
    </>
  );
}
