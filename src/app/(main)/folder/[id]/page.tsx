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

  const { data, isLoading, error } = useSWR(
    `${baseUrl}/folder/${id}`,
    getData<Folder>,
    {
      revalidateOnMount: true,
    }
  );

  const deleteFolder = async () => {
    await deleteItem({ id, type: "folders" }).then((data) => {
      if (data) push("/");
    });
  };

  return (
    <>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar</p>}
      <>
        <PageTitle title={`Pasta ${data?.name}`} />
        <section className="flex flex-col lg:flex-row gap-4 mt-10 mb-5">
          <ul className="flex flex-col gap-4 w-full sm:pr-6">
            {data?.links?.length != 0 ? (
              <>
                {data?.links?.map((link) => {
                  return <LinkCard key={link.id} link={link} />;
                })}
              </>
            ) : (
              <li>
                <span className="text-xl">
                  Nenhum link adicionado a pasta <strong>{data?.name}</strong>{" "}
                  ainda
                </span>
              </li>
            )}
          </ul>
          <aside className="max-w-md w-full">
            <section className="flex justify-between items-center gap-4 mb-4  ">
              <Link className="w-1/2" href={`/link/create/${data?.id}`}>
                <button className="text-white w-full bg-green-600 flex items-center justify-center text-2xl px-2 py-1 rounded transition hover:brightness-75">
                  <IconPlus />
                </button>
              </Link>
              <Link className="w-full" href={`/folder/edit/${id}`}>
                <button
                  disabled={data?.links?.length != 1}
                  className={`${
                    data?.links?.length === 0 && "opacity-50 cursor-not-allowed"
                  } text-white w-full bg-blue-600 px-2 py-1 rounded transition hover:brightness-75`}
                >
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteFolder()}
                disabled={data?.links?.length === 0}
                className={`${
                  data?.links?.length === 0 && "opacity-50 cursor-not-allowed"
                } text-white w-1/2 bg-red-600  flex items-center justify-center text-2xl px-2 py-1  rounded transition hover:brightness-75`}
              >
                <IconDelete />
              </button>
            </section>
            <section className="flex flex-col gap-2 border-2 border-primary rounded p-4 ">
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
    </>
  );
}
