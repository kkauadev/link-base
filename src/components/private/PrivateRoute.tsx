"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState({} as boolean);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    const check = async () => {
      setIsUserAuthenticated(await checkUserAuthenticated());
      setIsLoading(false);
    };
    check();
  }, []);

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login);
    }
  }, [isUserAuthenticated, push]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isUserAuthenticated ? <>{children}</> : null;
};
