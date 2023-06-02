import Cookies from "js-cookie";

export const getData = async <T>(
  url: string,
  stored: { token: string; id: string } | undefined,
  cookieName: string
): Promise<T | undefined> => {
  if (stored) {
    const cookies = Cookies.get(cookieName);
    if (cookies) {
      const cookie: T = JSON.parse(cookies);

      return cookie;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${stored.token}`,
      },
    });

    const data: T = await res.json();

    const expirationTime = new Date();
    expirationTime.setSeconds(expirationTime.getSeconds() + 10);

    Cookies.set(cookieName, JSON.stringify(data), { expires: expirationTime });

    return data;
  }
  return undefined;
};
