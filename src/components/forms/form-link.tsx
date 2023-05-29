"use client";

import { fetcher } from "@/functions/fetcher-data";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SuccessMessage } from "../messages/message-success";
import { CustomError } from "@/types/custom-error";
import { getAllCookies } from "@/functions/get-cookies";
import { TextareaField } from "../fields/textarea-field";
import { FormButton } from "../buttons/forms-button";
import { baseUrl } from "@/constants/base-url";
import { Input } from "postcss";
import { InputField } from "../fields/input-field";

interface FormFoldersProps {
  inputTitleValue?: string;
  inputLinkValue?: string;
  textareaDescriptionValue?: string;
  finishBtnText: "Editar" | "Adicionar";
  type: "create" | "update";
}

export const FormLink = ({
  inputTitleValue = "",
  inputLinkValue = "",
  textareaDescriptionValue = "",
  finishBtnText,
  type,
}: FormFoldersProps) => {
  const [inputName, setInputName] = useState(inputTitleValue);
  const [inputLink, setInputLink] = useState(inputLinkValue);
  const [textareaDescription, setTextareaDescription] = useState(
    textareaDescriptionValue
  );
  const [successMessage, setSuccessMessage] = useState(false);
  const { push } = useRouter();
  const { id } = useParams();
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const cookies = getAllCookies();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputName) throw new Error("Nome da pasta não pode ser vazio");
      if (inputName.length < 3)
        throw new Error("Nome da pasta deve ter no mínimo 3 caracteres");
      if (!inputLink) throw new Error("Link não pode ser vazio");
      if (!textareaDescription) throw new Error("Descrição não pode ser vazia");
      if (!cookies) throw new Error("Você não está logado");

      const body = JSON.stringify({
        title: inputName,
        link: inputLink,
        description: textareaDescription,
      });

      const res = await fetch(`${baseUrl}/folders/${type}/${cookies.id}`, {
        body,
        method: type === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao criar pasta");

      setSuccessMessage(true);

      return;
    } catch (error) {
      const customError: CustomError = error as CustomError;
      setError({
        message: customError.message,
        show: true,
      });

      return;
    }
  };

  return (
    <>
      {successMessage && (
        <SuccessMessage
          message="Sucesso na ação, redirecionando..."
          onCloseMap={{
            show: () => {
              setSuccessMessage(false);
              finishBtnText === "Adicionar" ? push("/") : push("/folders");
            },
          }}
        />
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
          <InputField
            label="Título"
            value={inputName}
            onChangeMap={{
              onChange: setInputName,
            }}
          />
          <InputField
            label="Link"
            value={inputLink}
            onChangeMap={{
              onChange: setInputLink,
            }}
          />
          <TextareaField
            label="Descrição"
            value={textareaDescription}
            onChangeMap={{
              onChange: setTextareaDescription,
            }}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <FormButton backgroundColor="green" text="Criar" type="submit" />
          <FormButton
            backgroundColor="red"
            text="Cancelar"
            onClickMap={{
              click: () => push("/folder"),
            }}
          />
        </div>
      </form>
    </>
  );
};
