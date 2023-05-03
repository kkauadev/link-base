export const checkUserAuthenticated = async () => {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return false;
  }
  const { token, id } = JSON.parse(storedToken);

  const res = await fetch(`http://localhost:3333/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return true;
  } else {
    return false;
  }
};
