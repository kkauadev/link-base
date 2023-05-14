"use client";

import { fetcher } from "@/functions/fetcher-data";
import { CustomError } from "@/types/custom-error";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface FormFoldersProps {
  inputNameValue?: string;
  textareaDescriptionValue?: string;
  finishBtnText: "Editar" | "Adicionar";
  fetch: {
    url: string;
    options: RequestInit;
    token: string;
  };
}

export const FormFolders = ({
  inputNameValue = "",
  textareaDescriptionValue = "",
  finishBtnText,
  fetch,
}: FormFoldersProps) => {
  const [inputName, setInputName] = useState(inputNameValue);
  const [textareaDescription, setTextareaDescription] = useState(
    textareaDescriptionValue
  );
  const [successMessage, setSuccessMessage] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { push } = useRouter();

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaDescription(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputName) throw new Error("Nome da pasta não pode ser vazio");
      if (inputName.length < 3)
        throw new Error("Nome da pasta deve ter no mínimo 3 caracteres");

      const body = JSON.stringify({
        name: inputName,
        description: textareaDescription,
      });
      const res = await fetcher(fetch.url, fetch.token, {
        ...fetch.options,
        method: fetch.options.method,
        body,
      });

      if (!res.ok) throw new Error("Erro ao criar pasta");

      const data = res.json();
      data.then(() => {
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
          push("/");
        }, 2000);
      });
    } catch (error) {
      const customError: CustomError = error as CustomError;
      console.log(customError.message);
    }
  };

  return (
    <>
      {successMessage && (
        <aside className="bg-green-400 text-xl rounded p-3 absolute top-16 left-[35%] right-[35%]">
          Sucesso na ação, redirecionando...
        </aside>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl my-10 border-2 border-primary p-4 rounded"
      >
        <div className="flex flex-col gap-3">
          <div>
            <label className="block mb-1" htmlFor="input-folder-name">
              Nome da pasta
            </label>
            <input
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              className="bg-tertiary max-w-xl w-full px-2 py-1 rounded outline-none"
              type="text"
              name="input-folder-name"
              id="input-folder-name"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="input-folder-description">
              Descrição
            </label>
            <textarea
              onChange={(e) => handleChangeTextarea(e)}
              value={textareaDescription}
              ref={textareaRef}
              className="resize-none max-w-xl bg-tertiary w-full p-2 rounded outline-none"
              name="input-folder-description"
              id="input-folder-description"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          <button
            className="text-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-green-600"
            type="submit"
          >
            {finishBtnText}
          </button>
          <button
            onClick={() => push("/")}
            className="text-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
