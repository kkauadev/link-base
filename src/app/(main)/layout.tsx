"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useContext } from "react";

import { IconMenu } from "@/components/icons";
import { baseUrl } from "@/utils/constants/base-url";
import { User } from "@/types/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useGetData } from "@/hooks/get-data";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refresh } = useRouter();

  const [viewMenu, setViewMenu] = useState(false);
  const refOptionsMenu = useRef<HTMLDivElement>(null);

  const id = Cookies.get("id");
  const token = Cookies.get("token");

  const { data, isError } = useGetData<User>(
    `${baseUrl}/user/${id}`,
    token ?? ""
  );

  useEffect(() => {
    if (isError) {
      Cookies.remove("token");
      Cookies.remove("id");
      refresh();
    }
  }, [isError, refresh]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (refOptionsMenu.current?.contains(event.target as Node)) {
        return;
      }
      setViewMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setViewMenu]);

  return (
    <>
      <header className="bg-secondary">
        <nav className="w-full right-0 flex items-center justify-end gap-4 sm:gap-8 pt-4 pb-2 sm:pt-6 sm:pb-2 px-4 sm:px-14">
          <Link
            href="/"
            className="text-lg sm:text-xl transition hover:brightness-75"
          >
            Home
          </Link>
          <button
            onClick={() => setViewMenu((prev) => !prev)}
            className="label-menu text-3xl transition hover:brightness-75"
          >
            <IconMenu />
          </button>
          {viewMenu && (
            <div
              ref={refOptionsMenu}
              className={`w-96 absolute top-10 md:right-[5rem] z-10 border-2 border-primary flex-col gap-4 mt-4 bg-secondary p-4 px-2 rounded-md`}
            >
              {data ? (
                <div className="bg-tertiary p-2 rounded flex items-center gap-2">
                  {/* <Link href={`/${data.name}`} className="flex gap-5"> */}
                  <Link href={`/`} className="flex gap-5">
                    <span className="text-2xl w-full text-ellipsis">
                      {data?.name}
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="h-16 bg-tertiary p-2 rounded animate-pulse" />
              )}
              <Link
                className="py-2 block text-xl px-2 transition hover:brightness-75"
                href="/"
              >
                Minhas pastas
              </Link>
              <Link
                className="block text-xl px-2 transition hover:brightness-75"
                href="/logout"
              >
                Sair
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main className="bg-secondary w-full px-4 py-2 sm:px-14 sm:py-8 min-h-screen">
        {children}
      </main>
    </>
  );
}
