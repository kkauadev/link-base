"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormInput } from "@/components/forms/form-input";
import { IconClose } from "@/components/icons";
import { loginRequest } from "@/services/login";
import { ErrorMessages } from "@/utils/constants/erro-messages";
import { handlingError } from "@/utils/functions/handling-error";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState({
    message: "",
  });

  const route = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoadingRequest(true);
      if (
        !username ||
        username.length < 3 ||
        !password ||
        password.length < 3
      ) {
        throw new Error(ErrorMessages.INVALID_LOGIN);
      }

      const res = await loginRequest(username, password);

      if (res.status === 401) {
        throw new Error(ErrorMessages.INVALID_LOGIN);
      }

      if (!res.ok) {
        throw new Error(ErrorMessages.SERVER_ERROR);
      }

      const data = await res.json();

      if (data.auth === false) {
        throw new Error(ErrorMessages.INVALID_LOGIN);
      }
      route.push("/");

      Cookies.remove("token");
      Cookies.remove("id");
      Cookies.set("token", data.token, { expires: new Date().getHours() + 1 });
      Cookies.set("id", data.id);

      setLoadingRequest(false);
      return;
    } catch (error) {
      setError(handlingError(error));
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
            {error.message && (
              <aside className="relative bg-red-400 p-4 flex justify-center items-center rounded">
                <span className="text-red-900 text-lg">{error.message}</span>
                <button
                  onClick={() => setError({ message: "" })}
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
