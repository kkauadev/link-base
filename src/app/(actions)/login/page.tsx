"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormInput } from "@/components/forms/form-input";
import { IconClose } from "@/components/icons";
import { baseUrl } from "@/constants/base-url";
import { CustomError } from "@/types/custom-error";
import { loginRequest } from "@/services/login";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoadingRequest(true);
      if (!username || !password) throw new Error("Preencha todos os campos");

      const res = await loginRequest(baseUrl, username, password);

      if (res.status === 401) {
        throw new Error("Usuário ou senha incorretos");
      }

      if (!res.ok) {
        throw new Error("Erro na solicitação. Status: " + res.status);
      }

      const data = await res.json();

      Cookies.remove("token");
      Cookies.remove("id");
      Cookies.set("token", data.token, { expires: new Date().getHours() + 1 });
      Cookies.set("id", data.id);

      route.push("/");
      setLoadingRequest(false);
      return;
    } catch (error) {
      const customError: CustomError = error as CustomError;
      setLoadingRequest(false);
      setError({
        error: true,
        message: customError.message || "Usuário ou senha incorretos",
      });
    }
  };

  return (
    <>
      <main className="bg-primary sm:bg-inherit w-full h-[96vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-inherit sm:bg-secondary w-full max-w-lg p-6 sm:p-10 pb-6 rounded"
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
                data-cy="login-username-input"
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
                data-cy="login-password-input"
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
                data-cy="login-show-password-checkbox"
              />
              <label className="text-sm" htmlFor="view-password">
                Visualizar senha
              </label>
            </div>
          </section>
          <section>
            <button
              disabled={loadingRequest}
              className={`${
                loadingRequest && "brightness-50"
              } text-white w-full bg-quaternary transition rounded-sm p-1 text-lg hover:brightness-75`}
              type="submit"
              data-cy="login-submit-login-button"
            >
              {loadingRequest ? "Carregando..." : "Entrar"}
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
          </section>
        </form>
      </main>
      <footer className="bg-primary sm:bg-inherit flex justify-center items-center">
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
