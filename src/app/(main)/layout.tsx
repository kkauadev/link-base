"use client";

import { PrivateRoute } from "@/components/private/PrivateRoute";
import { checkIsPublicRoute } from "@/functions/check-public-route";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [isPublicPage, setIsPublicPage] = useState(false);
  const { push } = useRouter();

  const pathname = usePathname();

  const verifyUserAuthenticated = useCallback(async () => {
    if ((await checkUserAuthenticated()) === false) {
      return push("/login");
    }
  }, [push]);

  useEffect(() => {
    verifyUserAuthenticated();
    setIsPublicPage(checkIsPublicRoute(pathname!));
  }, [verifyUserAuthenticated, pathname]);

  return (
    <>
      {!isPublicPage && (
        <PrivateRoute>
          <div className="flex min-h-screen">
            <aside className="max-w-[18rem] w-full h-screen top-0 sticky flex flex-col gap-10 bg-primary text-primary py-10 px-5">
              <div className="flex justify-between items-center gap-3 p-4 border-y border-secondary ">
                <div>
                  <Image className="bg-secondary w-14 h-14" src="" alt="" />
                </div>
                <div className="w-36">
                  <h2 className="w-[100%] text-secondary text-lg truncate">
                    Fulano de talasdadasdas
                  </h2>
                  <h3 className="text-sm mt-[-4px]">Função</h3>
                </div>
              </div>
              <nav className="border-y border-secondary py-2">
                <ul className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="w-full bg-secondary rounded transition  hover:brightness-75"
                  >
                    <li className="p-4 ">Home</li>
                  </Link>
                  <Link
                    href="#"
                    className="w-full bg-secondary rounded transition hover:brightness-75"
                  >
                    <li className="p-4 ">Dashboard</li>
                  </Link>
                  <Link
                    href="#"
                    className="w-full bg-secondary rounded transition hover:brightness-75"
                  >
                    <li className="p-4 ">Dashboard</li>
                  </Link>
                  <Link
                    href="#"
                    className="w-full bg-secondary rounded transition hover:brightness-75"
                  >
                    <li className="p-4 ">Dashboard</li>
                  </Link>
                  <Link
                    href="#"
                    className="w-full bg-secondary rounded transition hover:brightness-75"
                  >
                    <li className="p-4 ">Dashboard</li>
                  </Link>
                </ul>
              </nav>
            </aside>
            <main className="bg-secondary w-full p-14">{children}</main>
          </div>
        </PrivateRoute>
      )}
    </>
  );
}
