import { baseUrl } from "@/constants/base-url";

export const loginRequest = async (username: string, password: string) => {
  return await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};
