import { fetcher } from "@/functions/fetcher-data";
import { getUserToken } from "@/functions/get-user-token";

export const deleteItem = async (id: string) => {
  const stored = getUserToken();
  if (!stored) return console.log("Não há token");
  return await fetcher(
    `http://localhost:3333/folders/delete/${id}`,
    stored.token,
    {
      method: "DELETE",
    }
  );
};

export const getData = <T>(url: string) => {
  const stored = getUserToken();

  if (stored) {
    return fetcher<T>(url, stored.token, {
      method: "GET",
    });
  }
};
