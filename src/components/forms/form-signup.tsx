"use client";

import Link from "next/link";
import { useState } from "react";
import { FormInput } from "./form-input";

export const FormSignup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("http://localhost:3333/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
        <div className="flex flex-col">
          <label htmlFor="confirm-password-input">Confirme a senha</label>
          <FormInput
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type={viewPassword ? "text" : "password"}
            name="confirm-password-input"
            id="confirm-password-input"
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
            className="w-full bg-green-600 transition rounded-sm p-1 text-lg hover:brightness-50"
            type="submit"
          >
            Cadastrar
          </button>
          <span className="block text-sm text-center  mt-3">
            Já tem uma conta?{" "}
            <Link
              href={"/login"}
              className="underline transition hover:brightness-50"
            >
              Clique aqui
            </Link>{" "}
            e faça login
          </span>
        </div>
      </section>
    </form>
  );
};
