"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface FormFoldersProps {
  inputNameValue?: string;
  textareaDescriptionValue?: string;
  fetchUrl: string;
  fetchOptions: RequestInit;
}

export const FormFolders = ({
  inputNameValue = "",
  textareaDescriptionValue = "",
  fetchUrl,
  fetchOptions,
}: FormFoldersProps) => {
  const [inputName, setInputName] = useState(inputNameValue);
  const [textareaDescription, setTextareaDescription] = useState(
    textareaDescriptionValue
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaDescription(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
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
          className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-green-600"
          type="submit"
        >
          Criar
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-red-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
