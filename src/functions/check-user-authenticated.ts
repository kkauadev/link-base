import Cookies from "js-cookie";

export const checkUserAuthenticated = async () => {
  const token = Cookies.get("token");
  const id = Cookies.get("id");

  try {
    if (!token || !id) {
      throw new Error("Authentication check failed");
    }
    const res = await fetch(`http://localhost:3333/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return true;
    } else {
      throw new Error("Authentication check failed");
    }
  } catch (e) {
    return false;
  }
};
