"use client";

import { PrivateRoute } from "@/components/private/PrivateRoute";
import { checkIsPublicRoute } from "@/functions/check-public-route";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu as IconMenu } from "react-icons/ai";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewMenu, setViewMenu] = useState(false);
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
          <header className="bg-secondary">
            <nav className="w-full sm:absolute right-0 sm:w-[50vw] flex items-center justify-end gap-4 sm:gap-8 pt-4 pb-2 sm:py-6 px-4 sm:px-14">
              <Link
                href="/"
                className="text-lg sm:text-xl transition hover:brightness-75"
              >
                Home
              </Link>
              <button
                onClick={() => setViewMenu((prev) => !prev)}
                className="text-3xl transition hover:brightness-75 hover:scale-75"
              >
                <IconMenu />
              </button>
              {
                <div
                  className={`${
                    viewMenu ? "flex" : "hidden"
                  } z-10 border-2 border-primary flex-col gap-4 absolute right-5 top-14 bg-secondary p-4 rounded-md`}
                >
                  <Link
                    className="text-xl transition hover:brightness-75"
                    href="/"
                  >
                    Minhas pastas
                  </Link>
                  <Link
                    className="text-xl transition hover:brightness-75"
                    href="/logout"
                  >
                    Sair
                  </Link>
                </div>
              }
            </nav>
          </header>
          <main className="bg-secondary w-full px-4 py-2 sm:px-14 sm:py-8 min-h-screen">
            {children}
          </main>
        </PrivateRoute>
      )}
    </>
  );
}
