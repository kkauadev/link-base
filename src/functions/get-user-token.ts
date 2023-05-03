export const getUserToken = (): { id: string, token: string } | undefined => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    return JSON.parse(storedToken);
  }
  return undefined;
};
