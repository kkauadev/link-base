"use client";

import { FormLink } from "@/components/forms/form-link";
import { getUserToken } from "@/utils/functions/get-user-token";

export default function FolderEdit() {
  const stored = getUserToken();

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Crie um novo link</h1>
      {stored && <FormLink type="create" finishBtnText="Adicionar" />}
    </>
  );
}
