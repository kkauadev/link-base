import Cookies from "js-cookie";

export const getAllCookies = () => {
  const token = Cookies.get("token");
  const id = Cookies.get("id");

  return token && id ? { token, id } : null;
};
