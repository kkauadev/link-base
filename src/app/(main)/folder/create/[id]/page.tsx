"use client";

import Cookies from "js-cookie";
import { useParams } from "next/navigation";

import { FormFolders } from "@/components/forms/form-folders";

export default function FolderCreate() {
  const { id } = useParams();
  const token = Cookies.get("token");

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Crie uma nova pasta</h1>
      <FormFolders
        finishBtnText="Adicionar"
        type="create"
        paramId={id}
        cookies={{ token: token ?? "" }}
      />
    </>
  );
}
