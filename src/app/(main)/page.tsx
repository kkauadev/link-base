"use client";

import Cookies from "js-cookie";
import Link from "next/link";

import { FolderCard } from "@/components/cards/folder-card";
import { MessageErrorLoad } from "@/components/messages/message-error-load";
import { baseUrl } from "@/utils/constants/base-url";
import { useGetData } from "@/hooks/get-data";
import { User } from "@/types/user";
import { LoadingCard } from "@/components/cards/loading-card";

export default function Home() {
  const id = Cookies.get("id");
  const token = Cookies.get("token");
  const { data, isError, isLoading } = useGetData<User>(
    `${baseUrl}/user/${id}`,
    token ?? ""
  );

  return (
    <>
      <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
        Minhas pastas
      </h1>
      <section className="flex flex-col gap-4 mt-10 mb-5">
        {data && (
          <>
            <div>
              <Link
                role={"button"}
                href={`/folder/create/${id}`}
                className={`w-[10rem] px-4 py-2 items-center flex gap-4 text-white rounded transition hover:brightness-75 bg-green-600`}
              >
                <span>Criar nova pasta</span>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {data.folders ? (
                data.folders.map(
                  ({ id: folderId, name, description, links }) => {
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
                  }
                )
              ) : (
                <p>Ainda não existe nenhuma página</p>
              )}
            </div>
          </>
        )}
      </section>
      <LoadingCard
        className="flex-col md:flex-row w-full flex-wrap mt-10 mb-5 gap-4"
        isLoading={isLoading}
        quantity={6}
      >
        <div className="bg-tertiary h-28 flex flex-row justify-between w-full md:w-[36rem] lg:w-[31.2rem] py-4 px-5 rounded" />
      </LoadingCard>
      <MessageErrorLoad isOpen={isError} />
    </>
  );
}
