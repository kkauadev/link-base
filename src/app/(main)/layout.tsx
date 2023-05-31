"use client";

import { baseUrl } from "@/constants/base-url";
import { getUserToken } from "@/functions/get-user-token";
import { getData } from "@/services/get-data";
import { User } from "@/types/user";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu as IconMenu } from "react-icons/ai";
import useSWR from "swr";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewMenu, setViewMenu] = useState(false);

  const stored = getUserToken();

  const { data } = useSWR(
    stored && `${baseUrl}/user/${stored.id}`,
    (url) => getData<User>(url, stored, "layoutpage" + stored?.id),
    {
      revalidateOnMount: false,
    }
  );

  return (
    <>
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
          {data && (
            <div
              className={`${
                viewMenu ? "flex" : "hidden"
              } z-10 border-2 border-primary flex-col gap-4 absolute right-5 top-14 bg-secondary p-4 px-2 rounded-md`}
            >
              <div className="bg-tertiary p-2 rounded">
                <span className="text-sm cursor-default">Perfil</span>
                <h2 className="text-2xl cursor-default w-full text-ellipsis">
                  {data.name}
                </h2>
              </div>
              <Link
                className="text-xl px-2 transition hover:brightness-75"
                href="/"
              >
                Minhas pastas
              </Link>
              <Link
                className="text-xl px-2 transition hover:brightness-75"
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
