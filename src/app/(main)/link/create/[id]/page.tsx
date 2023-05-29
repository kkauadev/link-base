"use client";

import { FormLink } from "@/components/forms/form-link";
import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";

export default function FolderEdit() {
  const stored = getUserToken();

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite a pasta</h1>
      {stored && <FormLink type="create" finishBtnText="Adicionar" />}
    </>
  );
}
