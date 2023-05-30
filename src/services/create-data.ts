import { baseUrl } from "@/constants/base-url";

export const createOrUpdateData = async (
  bodyReq: object,
  url: "folders" | "links",
  type: "create" | "update",
  id: string,
  token: string
) => {
  const body = JSON.stringify(bodyReq);

  const res = await fetch(`${baseUrl}/${url}/${type}/${id}`, {
    body,
    method: type === "create" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
