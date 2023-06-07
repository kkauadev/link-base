"use client";

import Link from "next/link";
import { AiOutlineMenu as IconMenu } from "react-icons/ai";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <label
            htmlFor="toggle-menu-input"
            className="label-menu text-3xl transition hover:brightness-75 hover:scale-75"
          >
            <IconMenu />
          </label>
          <input
            name="toggle-menu-input"
            id="toggle-menu-input"
            type="checkbox"
            className="toggle-menu"
          />
          <div
            className={`menu z-10 border-2 border-primary flex-col gap-4 mt-4 bg-secondary p-4 px-2 rounded-md`}
          >
            <div className="bg-tertiary p-2 rounded">
              <span className="text-sm cursor-default">Perfil</span>
              <h2 className="text-2xl cursor-default w-full text-ellipsis"></h2>
            </div>
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
        </nav>
      </header>
      <main className="bg-secondary w-full px-4 py-2 sm:px-14 sm:py-8 min-h-screen">
        {children}
      </main>
    </>
  );
}
