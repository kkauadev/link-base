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
      {isLoading && (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
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
