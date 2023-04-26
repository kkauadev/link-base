"use client";

import Link from "next/link";
import { useState } from "react";
import { FormInput } from "./form-input";

export const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-secondary p-10 pb-6 rounded"
    >
      <section className="flex flex-col gap-2 mb-2">
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
            className="w-full bg-quaternary transition rounded-sm p-1 text-lg hover:brightness-75"
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
