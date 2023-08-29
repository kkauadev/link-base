"use client";

import { useParams, useRouter } from "next/navigation";
import { memo, useState } from "react";

import { getAllCookies } from "@/utils/functions/get-cookies";
import { createOrUpdateData } from "@/services/create-data";
import { FormButton } from "@/components/buttons/forms-button";
import { InputField } from "@/components/fields/input-field";
import { TextareaField } from "@/components/fields/textarea-field";
import { SuccessMessage } from "@/components/messages/message-success";
import { ErrorMessage } from "../messages/message-error";
import { handlingError } from "@/utils/functions/handling-error";

interface FormFoldersProps {
  inputTitleValue?: string;
  inputLinkValue?: string;
  textareaDescriptionValue?: string;
  finishBtnText: "Editar" | "Adicionar";
  type: "create" | "update";
}

const FormLinkLocal = ({
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
  const { id, folderId } = useParams();
  const [error, setError] = useState({
    message: "",
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

      const res = await createOrUpdateData(
        {
          title: inputName,
          link: inputLink,
          description: textareaDescription,
        },
        "links",
        type,
        id,
        cookies.token
      );

      if (!res.ok) throw new Error("Erro ao criar pasta");

      setError({ message: "" });
      setSuccessMessage(true);
    } catch (error) {
      setError(handlingError(error));
    }
  };

  return (
    <>
      {error.message && (
        <ErrorMessage
          message={error.message}
          closeMessage={() => setError({ message: "" })}
        />
      )}
      {successMessage && (
        <SuccessMessage
          message="Sucesso na ação, redirecionando..."
          onCloseMap={{
            show: () => {
              setSuccessMessage(false);
              push(type === "create" ? `/folder/${id}` : `/folder/${folderId}`);
            },
          }}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl my-10 border-2 border-primary p-4 rounded"
      >
        <div className="flex flex-col gap-3">
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
          <FormButton
            backgroundColor="green"
            text={finishBtnText}
            type="submit"
          />
          <FormButton
            backgroundColor="red"
            text="Cancelar"
            onClickMap={{
              click: () => push(`/folder/${id}`),
            }}
          />
        </div>
      </form>
    </>
  );
};

export const FormLink = memo(FormLinkLocal);
