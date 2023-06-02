import { FormFolders } from "@/components/forms/form-folders";
import { baseUrl } from "@/constants/base-url";
import { Folder } from "@/types/user";
import { cookies } from "next/headers";

export default async function FolderEdit({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const get = async (paramId: string) => {
    try {
      const res = await fetch(`${baseUrl}/folder/${paramId}`, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });

      return res;
    } catch (error) {
      return null;
    }
  };

  const res = await get(params.id);

  if (!res || !res.ok) {
    return <div>Erro ao carregar dados</div>;
  }

  const data: Folder = await res.json();

  return (
    <>
      <h1 className="w-[calc(50vw-3.5rem)] text-3xl">Edite a pasta</h1>
      <FormFolders
        finishBtnText="Editar"
        type="update"
        inputNameValue={data?.name}
        textareaDescriptionValue={data?.description}
      />
    </>
  );
}
