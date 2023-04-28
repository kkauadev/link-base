"use client";

import { FormFolders } from "@/components/forms/form-folders";

export default function FolderEdit() {
  return (
    <>
      <h1 className="text-3xl">Edite a pasta</h1>
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
