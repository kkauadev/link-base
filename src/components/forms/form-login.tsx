"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormInput } from "./form-input";
import { checkUserAuthenticated } from "@/functions/check-user-authenticated";
import Cookies from "js-cookie";
import { AiOutlineClose as IconClose } from "react-icons/ai";

export const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Erro na solicitação. Status: " + res.status);
      }

      const data = await res.json();
      Cookies.set("token", data.token);
      Cookies.set("id", data.id);
      if (await checkUserAuthenticated()) {
        return route.push("/");
      }
    } catch (error) {
      setError({
        error: true,
        message: "Usuário ou senha incorretos",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-secondary p-10 pb-6 rounded"
    >
      <section className="flex flex-col gap-2 mb-2">
        {error.error && (
          <aside className="relative bg-red-400 p-4 flex justify-center items-center rounded">
            <span className="text-red-900 text-lg">{error.message}</span>
            <button
              onClick={() => setError({ error: false, message: "" })}
              className="absolute right-[4%] text-red-900 text-lg hover:text-red-600 transition"
            >
              <IconClose />
            </button>
          </aside>
        )}

        <div className="flex flex-col">
          <label htmlFor="username-input">Usuário</label>
          <FormInput
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username-input"
            id="username-input"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password-input">Senha</label>
          <FormInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={viewPassword ? "text" : "password"}
            name="password-input"
            id="password-input"
          />
        </div>
        <div className="flex gap-2 items-center px-1">
          <FormInput
            onChange={(e) => setViewPassword(e.target.checked)}
            className="rounded-sm transition bg-tertiary hover:brightness-75"
            checked={viewPassword}
            type="checkbox"
            name="view-password"
            id="view-password"
          />
          <label className="text-sm" htmlFor="view-password">
            Visualizar senha
          </label>
        </div>
      </section>
      <section>
        <div>
          <button
            className="text-white w-full bg-quaternary transition rounded-sm p-1 text-lg hover:brightness-75"
            type="submit"
          >
            Entrar
          </button>
          <span className="block text-sm text-center  mt-3">
            Não tem conta?{" "}
            <Link
              href={"/signup"}
              className="underline transition hover:brightness-50"
            >
              Clique aqui
            </Link>{" "}
            e cadastre-se
          </span>
        </div>
      </section>
    </form>
  );
};
