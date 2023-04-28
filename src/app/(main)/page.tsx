"use client";

import { FolderCard } from "@/components/cards/folder-card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [viewEditButton, setViewEditButton] = useState(false);
  const [viewDeleteButton, setViewDeleteButton] = useState(false);

  const router = useRouter();

  return (
    <>
      <h1 className="text-3xl">Minhas pastas</h1>
      <section className="flex flex-col gap-4 mt-10 mb-5">
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/folder/create")}
            className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-green-600"
          >
            Adicionar
          </button>
          <button
            onClick={() => {
              setViewDeleteButton(false);
              setViewEditButton((prev) => !prev);
            }}
            className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-blue-600"
          >
            Editar
          </button>
          <button
            onClick={() => {
              setViewEditButton(false);
              setViewDeleteButton((prev) => !prev);
            }}
            className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-red-600"
          >
            Excluir
          </button>
        </div>
      </section>
      <section className="flex flex-wrap gap-5">
        <FolderCard
          id="1"
          title="sdadasdaaaaaaaaaaaaaaaaaaaaaasdasdas"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam suscipit magni exercitationem quod nisi asperiores laboriosam doloribus aspernatur ab saepe quam aliquam"
          folderLink="#"
          quantityOfLinks={10}
          viewButtons={{ edit: viewEditButton, delete: viewDeleteButton }}
        />
        <FolderCard
          id="2"
          title="sdadasdaaaaaaaaaaaaaaaaaaaaaasdasdas"
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam suscipit magni exercitationem quod nisi asperiores laboriosam doloribus aspernatur ab saepe quam aliquam"
          folderLink="#"
          quantityOfLinks={10}
          viewButtons={{ edit: viewEditButton, delete: viewDeleteButton }}
        />
      </section>
    </>
  );
}
