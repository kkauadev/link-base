export const fetcher = <T>(url: string, token: string, options: RequestInit) =>
  fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json() as Promise<T>);
