"use client";

import { FormFolders } from "@/components/forms/form-folders";
import { getUserToken } from "@/functions/get-user-token";

export default function FolderCreate() {
  const stored = getUserToken();
  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Crie uma nova pasta</h1>
      {stored && (
        <FormFolders
          finishBtnText="Adicionar"
          fetch={{
            url: `http://localhost:3333/folders/create/${stored.id}`,
            options: { method: "POST" },
            token: stored.token,
          }}
        />
      )}
    </>
  );
}
