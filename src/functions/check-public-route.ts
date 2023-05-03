import { APP_ROUTES } from "@/constants/app-routes";

export const checkIsPublicRoute = (pathname: string) => {
  const appPublicRoutes = Object.values(APP_ROUTES.public);

  return appPublicRoutes.includes(pathname);
};
