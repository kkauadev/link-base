"use client";

import { CgSearch as IconSearch } from "react-icons/cg";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

import { LinkCard } from "@/components/cards/link-card";
import { IconDelete, IconPlus } from "@/components/icons";
import { MessageErrorLoad } from "@/components/messages/message-error-load";
import { baseUrl } from "@/utils/constants/base-url";
import {
  dateFormatter,
  relativeDateFormatter,
} from "@/utils/functions/date-formatter";
import { useGetData } from "@/hooks/get-data";
import { deleteData } from "@/services/delete-data";
import { Folder } from "@/types/user";
import { Button } from "@/components/buttons/button";
import { ConfirmActionCard } from "@/components/cards/confirm-action-card";
import { LoadingCard } from "@/components/cards/loading-card";

type handleDeleteType = (
  id: string | undefined,
  token: string | undefined,
  paramsId: string | undefined
) => Promise<void>;

type ActionButtonProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
};

const ActionButton = ({ children, className, href }: ActionButtonProps) => {
  return (
    <Link
      className={`h-8 w-full flex items-center justify-center text-xl p-2 rounded transition hover:brightness-75 ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default function FolderPage() {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const { id: routeParameterId } = useParams();
  const [dataLinks, setDataLinks] = useState<Folder["links"]>([]);
  const [toggleInputSearch, setToggleInputSearch] = useState(false);
  const { push } = useRouter();
  const cookieId = Cookies.get("id");
  const cookieToken = Cookies.get("token");

  const { data, isError, isLoading } = useGetData<Folder>(
    `${baseUrl}/folder/${routeParameterId}`,
    cookieToken ?? ""
  );

  useEffect(() => {
    if (data?.links) {
      setDataLinks(data?.links);
    }
  }, [data?.links]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data?.links) return;
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.trim() === "") return setDataLinks(data?.links);

    const dataFiltered = data?.links.filter((folder) =>
      folder.title.toLowerCase().includes(searchTerm)
    );
    setDataLinks(dataFiltered);
  };

  const MemoizedLinkCard = memo(LinkCard);

  const handleDelete: handleDeleteType = async (id, tk, prmId) => {
    if (id && tk && prmId)
      await deleteData({ id, token: tk }, prmId, "folders").then(() =>
        push("/")
      );
  };

  return (
    <>
      <MessageErrorLoad isOpen={isError} />
      <LoadingCard
        className="flex-col gap-4 w-2/3 pt-20 sm:pr-6"
        isLoading={isLoading}
        quantity={4}
      >
        <div className="h-32 max-w-5xl w-full brightness-75 bg-tertiary p-4 rounded" />
      </LoadingCard>

      <ConfirmActionCard
        handleConfirm={() => {
          handleDelete(cookieId, cookieToken, routeParameterId);
        }}
        handleClose={() => setDeleteModalIsOpen(false)}
        isModalOpen={deleteModalIsOpen}
      />
      {data && (
        <>
          <h1 className="sm:w-[calc(50vw-3.5rem)] text-xl sm:text-3xl">
            Pasta {data.name}
          </h1>
          <section className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row gap-4 mt-6 sm:mt-10 mb-5">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 h-10">
                <button
                  onClick={() => setToggleInputSearch((e) => !e)}
                  className="text-2xl hover:brightness-50 transition-all duration-200"
                >
                  <IconSearch />
                </button>
                {toggleInputSearch ? (
                  <input
                    onChange={handleSearch}
                    className="bg-tertiary outline-none border-2 border-secondary active:border-gray-500  focus:border-gray-500 rounded px-2 py-1 w-[20rem]"
                    type="text"
                  />
                ) : null}
              </div>
              <ul className="flex flex-col gap-4 w-full sm:pr-6">
                {dataLinks && dataLinks.length === 0 ? (
                  <li className="text-xl">
                    Nenhum link adicionado a pasta <strong>{data.name}</strong>{" "}
                    ainda
                  </li>
                ) : (
                  dataLinks.map((link) => {
                    return (
                      <MemoizedLinkCard
                        key={link.id}
                        link={link}
                        paramsId={routeParameterId}
                        stored={{
                          token: cookieToken ?? "",
                          id: cookieId ?? "",
                        }}
                      />
                    );
                  })
                )}
              </ul>
            </div>
            <aside className="max-w-md w-full">
              <section className="flex justify-between items-center gap-4 mb-4">
                <ActionButton
                  className="bg-green-600 text-[1.4rem] lg:text-lg"
                  href={`/link/create/${data.id}`}
                >
                  <IconPlus />
                </ActionButton>
                <ActionButton
                  className="bg-blue-600 text-[1rem] lg:text-lg"
                  href={`/folder/edit/${routeParameterId}`}
                >
                  Editar
                </ActionButton>
                <Button
                  onClick={() => setDeleteModalIsOpen((prev) => !prev)}
                  id="delete-folder-button"
                  className="h-8 text-[1.4rem] lg:text-lg text-white bg-red-600"
                >
                  <IconDelete />
                </Button>
              </section>
              <section className="text-sm sm:text-base flex flex-col gap-2 border-2 border-primary rounded p-3 sm:p-4">
                <p className="whitespace-normal w-full">{data.description}</p>
                <p>Total de links: {data?.links?.length}</p>
                <p>
                  Data de criação: {dateFormatter(new Date(data.createDate))}
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
