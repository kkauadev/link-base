export const checkUserAuthenticated = async () => {
  const storedToken = localStorage.getItem("token");
  const { token, id } = JSON.parse(storedToken ?? "{}");

  try {
    const res = await fetch(`http://localhost:3333/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return true;
    }
    throw new Error("Authentication check failed");
  } catch (e) {
    return false;
  }
};
