"use client";

import { FormInput } from "@/components/forms/form-input";
import { baseUrl } from "@/constants/base-url";
import { CustomError } from "@/types/custom-error";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose as IconClose } from "react-icons/ai";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!username || !password || !confirmPassword)
        throw new Error("Preencha todos os campos");

      if (password !== confirmPassword)
        throw new Error("As senhas não coincidem");

      if (username.length < 3)
        throw new Error("O nome deve conter no mínimo 3 caracteres");

      if (password.length < 8 && confirmPassword.length < 8)
        throw new Error("A senha deve conter no mínimo 8 caracteres");

      if (!/[A-Z]/.test(password) && !/[A-Z]/.test(confirmPassword))
        throw new Error("A senha deve conter pelo menos uma letra maiúscula");

      if (!/[a-z]/.test(password) && !/[a-z]/.test(confirmPassword))
        throw new Error("A senha deve conter pelo menos uma letra minúscula");

      if (!/[0-9]/.test(password) && !/[0-9]/.test(confirmPassword))
        throw new Error("A senha deve conter pelo menos um número");

      if (
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) &&
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(confirmPassword)
      )
        throw new Error("A senha deve conter pelo menos um caractere especial");

      const res = await fetch(`${baseUrl}/user/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro na solicitação. Status: " + res.status);
      }

      return push("/login");
    } catch (error) {
      const customError: CustomError = error as CustomError;
      setError({
        error: true,
        message: customError.message || "Ocorrreu um erro inesperado",
      });
    }
  };

  return (
    <>
      <main className="w-full h-[96vh] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-secondary p-10 pb-6 rounded"
        >
          <h1 className="text-3xl text-center mb-4">Criar conta</h1>
          <section className="bg-blue-200 text-blue-900 py-4 px-2 rounded mb-2">
            <ul className="ml-6 list-disc flex flex-col gap-2">
              <li>
                <span>O nome deve ter no mínimo 3 caracteres.</span>
              </li>
              <li>
                <span>A senha deve ter no mínimo 8 caracteres.</span>
              </li>
              <li>
                <span>Incluir números e letras maiúsculas e minúsculas.</span>
              </li>
              <li>
                <span>
                  Incluir um caractere especial que não seja letra nem número.
                </span>
              </li>
            </ul>
          </section>
          <section className="flex flex-col gap-2 mb-2">
            {error.error && (
              <aside className="relative bg-red-400 p-4 flex justify-center items-center rounded">
                <span className="text-white text-center">{error.message}</span>
                <button
                  onClick={() => setError({ error: false, message: "" })}
                  className="absolute right-[4%]"
                >
                  <IconClose className="text-white" />
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
                data-cy="signup-username-input"
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
                data-cy="signup-password-input"
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
                data-cy="signup-password-confirm-input"
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
                className="text-white w-full bg-green-600 transition rounded-sm p-1 text-lg hover:brightness-50"
                type="submit"
                data-cy="signup-submit-login-button"
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
      </main>
      <footer className="flex justify-center items-center">
        <span>
          Feito com carinho por{" "}
          <Link
            className="text-secondary transition hover:underline"
            href={"/"}
            target="_blank"
          >
            Kauã
          </Link>
        </span>
      </footer>
    </>
  );
}
