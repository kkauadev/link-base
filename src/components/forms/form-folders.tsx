"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormButton } from "@/components/buttons/forms-button";
import { InputField } from "@/components/fields/input-field";
import { TextareaField } from "@/components/fields/textarea-field";
import { ErrorMessage } from "@/components/messages/message-error";
import { SuccessMessage } from "@/components/messages/message-success";
import { createOrUpdateData } from "@/services/create-data";
import { CustomError } from "@/types/custom-error";

interface FormFoldersProps {
  inputNameValue?: string;
  placeholders?: string;
  textareaDescriptionValue?: string;
  finishBtnText: "Editar" | "Adicionar";
  type: "create" | "update";
  paramId: string;
  cookies?: {
    token: string;
  };
}

export const FormFolders = ({
  inputNameValue = "",
  textareaDescriptionValue = "",
  placeholders = "",
  finishBtnText,
  type,
  cookies,
  paramId,
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

  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inputName) throw new Error("Nome da pasta não pode ser vazio");
      if (inputName.length < 3)
        throw new Error("Nome da pasta deve ter no mínimo 3 caracteres");
      if (!cookies) throw new Error("Você não está logado");

      const res = await createOrUpdateData(
        {
          name: inputName,
          description: textareaDescription,
        },
        "folders",
        type,
        paramId,
        cookies.token
      );

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
              finishBtnText === "Adicionar"
                ? push("/")
                : push(`/folder/${paramId}`);
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
              click: () => push(!paramId ? "/" : `/folder/${paramId}`),
            }}
          />
        </div>
      </form>
    </>
  );
};
