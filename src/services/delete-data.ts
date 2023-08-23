import { baseUrl } from "@/utils/constants/base-url";

export const deleteData = async (
  stored: { token: string; id: string } | undefined,
  id: string,
  type: "folders" | "links",
  response?: () => void
) => {
  if (!stored) return console.log("Não há token");
  await fetch(`${baseUrl}/${type}/delete/${stored.token}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${id}`,
    },
  }).then((res) => {
    if (res.ok) {
      response && response();
    }
  });
};
