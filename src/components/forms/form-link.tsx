"use client";

import { fetcher } from "@/functions/fetcher-data";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface FormFoldersProps {
  inputTitleValue?: string;
  inputLinkValue?: string;
  textareaDescriptionValue?: string;
  fetch: {
    url: string;
    options: RequestInit;
    token: string;
  };
}

export const FormLink = ({
  inputTitleValue = "",
  inputLinkValue = "",
  textareaDescriptionValue = "",
  fetch,
}: FormFoldersProps) => {
  const [inputName, setInputName] = useState(inputTitleValue);
  const [inputLink, setInputLink] = useState(inputLinkValue);
  const [textareaDescription, setTextareaDescription] = useState(
    textareaDescriptionValue
  );
  const [successMessage, setSuccessMessage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { id } = useParams();

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaDescription(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = JSON.stringify({
      title: inputName,
      link: inputLink,
      description: textareaDescription,
    });
    const data = fetcher(fetch.url + id, fetch.token, {
      ...fetch.options,
      method: fetch.options.method,
      body,
    });
    data.then(() => {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        router.back();
      }, 2000);
    });
  };

  return (
    <>
      {successMessage && (
        <aside className="bg-green-700 text-xl rounded p-3 absolute top-16 left-[35%] right-[35%]">
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
              Título
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
            <label className="block mb-1" htmlFor="input-folder-name">
              Link
            </label>
            <input
              onChange={(e) => setInputLink(e.target.value)}
              value={inputLink}
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
            className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-green-600"
            type="submit"
          >
            Criar
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
