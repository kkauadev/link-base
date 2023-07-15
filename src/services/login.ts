export const loginRequest = async (
  url: string,
  username: string,
  password: string
) => {
  return await fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};
