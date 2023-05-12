import { baseUrl } from "@/constants/base-url";
import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";

interface IDeleteItem {
  id: string;
  type: "folders" | "links";
}

export const deleteItem = async ({ id, type }: IDeleteItem) => {
  const stored = getUserToken();
  if (!stored) return console.log("Não há token");
  return await fetcher(`${baseUrl}/${type}/delete/${id}`, stored.token, {
    method: "DELETE",
  });
};

export const getData = async <T>(url: string) => {
  const stored = getUserToken();

  if (stored) {
    return (await fetcher(url, stored.token, {
      method: "GET",
    })) as T;
  }
};
