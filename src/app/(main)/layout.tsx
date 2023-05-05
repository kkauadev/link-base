"use client";

import { PrivateRoute } from "@/components/private/PrivateRoute";
import { checkIsPublicRoute } from "@/functions/check-public-route";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu as IconMenu } from "react-icons/ai";

export default function MainLayout({
  children, // will be a page or nested layout
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
          <header>
            <nav className="absolute right-0 w-[50vw] flex items-center justify-end gap-8 py-6  px-14">
              <Link
                href="/"
                className="text-white text-xl transition hover:brightness-75"
              >
                Home
              </Link>
              <button
                onClick={() => setViewMenu((prev) => !prev)}
                className="text-white text-3xl transition hover:brightness-75 hover:scale-75"
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
                    className="text-white text-xl transition hover:brightness-75"
                    href="/folder"
                  >
                    Minhas pastas
                  </Link>
                  <Link
                    className="text-white text-xl transition hover:brightness-75"
                    href="/logout"
                  >
                    Sair
                  </Link>
                </div>
              }
            </nav>
          </header>
          <main className="bg-secondary w-full px-14 py-8 pt-6 min-h-screen">
            {children}
          </main>
        </PrivateRoute>
      )}
    </>
  );
}
