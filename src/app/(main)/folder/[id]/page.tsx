"use client";

import { LinkCard } from "@/components/cards/link-card";
import { baseUrl } from "@/constants/base-url";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/functions/date-formatter";
import { deleteItem, getData } from "@/services";
import { Folder } from "@/types/user";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AiOutlineDelete as IconDelete,
  AiOutlinePlus as IconPlus,
} from "react-icons/ai";
import useSWR from "swr";
import { PageTitle } from "../../../../components/layouts/title-page";

export default function FolderPage() {
  const { id } = useParams();
  const { push } = useRouter();

  const { data, error } = useSWR(`${baseUrl}/folder/${id}`, getData<Folder>, {
    revalidateOnMount: true,
  });

  const loadingCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(
        <li
          key={i}
          className="h-28 max-w-5xl w-full bg-tertiary p-4 rounded animate-pulse"
        />
      );
    }
    return cards;
  };

  const deleteFolder = async () => {
    await deleteItem({ id, type: "folders" }).then((data) => {
      if (data) push("/");
    });
  };

  return (
    <>
      {data ? (
        <PageTitle title={`Pasta ${data?.name}`} />
      ) : (
        <h1 className="text-xl sm:text-3xl">Carregando...</h1>
      )}
      <section className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row gap-4 mt-6 sm:mt-10 mb-5">
        <ul className="flex flex-col gap-4 w-full sm:pr-6">
          {data?.links?.length != 0 && (
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
              onClick={() => deleteFolder()}
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
