import { APP_ROUTES } from "@/constants/app-routes";

export const checaskIsPublicRoute = (pathname: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public);

  return appPublicRoutes.includes(pathname);
};
