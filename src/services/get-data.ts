export const getData = async <T>(
  url: string,
  stored: { token: string; id: string } | undefined
): Promise<T | undefined> => {
  if (stored) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stored.token}`,
      },
    });

    const data: T = await res.json();

    return data;
  }
  return undefined;
};
