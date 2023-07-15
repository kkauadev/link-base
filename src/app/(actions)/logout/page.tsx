"use client";

import Cookies from "js-cookie";
import Link from "next/link";

import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Cookies.remove("token");
    push("/login");
  };
  return (
    <>
      <main className="w-full h-[96vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 justify-center items-center border border-primary p-5 rounded min-w-[400px]"
        >
          <h1 className="text-2xl">
            Para encerrar sua sessão, clique no botão abaixo
          </h1>
          <button
            type="submit"
            className="text-lg px-4 py-2 rounded bg-red-600 transition hover:brightness-75"
          >
            Sair da conta
          </button>
        </form>
      </main>
      <footer className="flex justify-center items-center">
        <span>
          Feito com carinho por{" "}
          <Link
            className="text-secondary hover:underline"
            href={"https://github.com/Kato2004"}
            target="_blank"
          >
            Kauã
          </Link>
        </span>
      </footer>
    </>
  );
}
