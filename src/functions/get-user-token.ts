import Cookies from "js-cookie";

export const getUserToken = (): { id: string; token: string } | undefined => {
  const token = Cookies.get("token");
  const id = Cookies.get("id");

  if (token && id) {
    return {
      id,
      token,
    };
  }
  return undefined;
};
