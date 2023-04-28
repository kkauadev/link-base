"use client";
import { FormFolders } from "@/components/forms/form-folders";

export default function FolderCreate() {
  return (
    <>
      <h1 className="text-3xl">Crie uma nova pasta</h1>
      <FormFolders
        fetchUrl="/"
        fetchOptions={{
          headers: {
            "Content-Type": "application/json",
          },
        }}
      />
    </>
  );
}
