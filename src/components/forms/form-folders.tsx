"use client";

import { CustomError } from "@/types/custom-error";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { SuccessMessage } from "../messages/message-success";
import { baseUrl } from "@/constants/base-url";
import { getAllCookies } from "@/functions/get-cookies";
import { ErrorMessage } from "../messages/message-error";
import { TextareaField } from "../fields/textarea-field";
import { InputField } from "../fields/input-field";
import { FormButton } from "../buttons/forms-button";

interface FormFoldersProps {
  inputNameValue?: string;
  placeholders?: string;
  textareaDescriptionValue?: string;
  finishBtnText: "Editar" | "Adicionar";
  type: "create" | "update";
}

export const FormFolders = ({
  inputNameValue = "",
  textareaDescriptionValue = "",
  placeholders = "",
  finishBtnText,
  type,
}: FormFoldersProps) => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [inputName, setInputName] = useState(inputNameValue);
  const [textareaDescription, setTextareaDescription] = useState(
    textareaDescriptionValue
  );
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const cookies = getAllCookies();

  const { id } = useParams();
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputName) throw new Error("Nome da pasta não pode ser vazio");
      if (inputName.length < 3)
        throw new Error("Nome da pasta deve ter no mínimo 3 caracteres");
      if (!cookies) throw new Error("Você não está logado");

      const body = JSON.stringify({
        name: inputName,
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
              finishBtnText === "Adicionar" ? push("/") : push(`/folder/${id}`);
            },
          }}
        />
      )}
      {error.show && (
        <ErrorMessage
          message={error.message}
          onCloseMap={{
            show: () =>
              setError({
                message: "",
                show: false,
              }),
          }}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl my-10 border-2 border-primary p-4 rounded"
      >
        <div className="flex flex-col gap-3">
          <InputField
            label="Nome da pasta"
            value={inputName}
            placeholder={placeholders}
            onChangeMap={{
              onChange: (value: string) => setInputName(value),
            }}
          />
          <TextareaField
            label="Descrição"
            value={textareaDescription}
            placeholder={placeholders}
            onChangeMap={{
              onChange: (value: string) => setTextareaDescription(value),
            }}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <FormButton
            backgroundColor="green"
            text={type === "create" ? "Adicionar" : "Editar"}
            type="submit"
          />
          <FormButton
            backgroundColor="red"
            text="Cancelar"
            type="button"
            onClickMap={{
              click: () => push(!id ? "/" : `/folder/${id}`),
            }}
          />
        </div>
      </form>
    </>
  );
};
