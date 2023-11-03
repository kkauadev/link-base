"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgSearch as IconSearch } from "react-icons/cg";

import { FolderCard } from "@/components/cards/folder-card";
import { LoadingCard } from "@/components/cards/loading-card";
import { MessageErrorLoad } from "@/components/messages/message-error-load";
import { useGetData } from "@/hooks/get-data";
import { User } from "@/types/user";
import { baseUrl } from "@/utils/constants/base-url";

export default function Home() {
  const id = Cookies.get("id");
  const token = Cookies.get("token");
  const [toggleInputSearch, setToggleInputSearch] = useState(false);
  const [dataFolders, setDataFolders] = useState<User["folders"]>([]);
  const { data, isError, isLoading } = useGetData<User>(
    `${baseUrl}/user/${id}`,
    token ?? ""
  );

  useEffect(() => {
    if (data?.folders) {
      setDataFolders(data.folders);
    }
  }, [data?.folders]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data?.folders) return;
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.trim() === "") return setDataFolders(data?.folders);

    const dataFiltered = data?.folders.filter((folder) =>
      folder.name.toLowerCase().includes(searchTerm)
    );
    setDataFolders(dataFiltered);
  };

  return (
    <>
      <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
        Minhas pastas
      </h1>
      <section className="flex flex-col gap-4 mt-10 mb-5">
        {data && (
          <>
            <div className="flex justify-between items-center">
              <Link
                role={"button"}
                href={`/folder/create/${id}`}
                className={`w-[10rem] px-4 py-2 items-center flex gap-4 text-white rounded transition hover:brightness-75 bg-green-600`}
              >
                <span>Criar nova pasta</span>
              </Link>
              <div className="flex gap-4">
                {toggleInputSearch ? (
                  <input
                    onChange={handleSearch}
                    className="bg-tertiary outline-none border-2 border-secondary active:border-gray-500  focus:border-gray-500 rounded px-2 py-1 w-[20rem]"
                    type="text"
                  />
                ) : null}
                <button
                  onClick={() => setToggleInputSearch((e) => !e)}
                  className="text-2xl hover:brightness-50 transition-all duration-200"
                >
                  <IconSearch />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {dataFolders && dataFolders.length > 0 ? (
                dataFolders.map(
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
