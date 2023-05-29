import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";

interface IDeleteItem {
  id: string;
  type: "folders" | "links";
  storedToken: string;
}

export const deleteItem = async ({ id, type, storedToken }: IDeleteItem) => {
  const stored = getUserToken();
  if (!stored) return console.log("Não há token");
  return await fetch(`${baseUrl}/${type}/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
};

// export const getData = async <T>(url: string) => {
//   const stored = getUserToken();

//   if (stored) {
//     return (await fetcher(url, stored.token, {
//       method: "GET",
//     }).then((res) => res.json())) as T;
//   }
// };
