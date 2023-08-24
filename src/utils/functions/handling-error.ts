"use client";

import { CustomError } from "@/types/custom-error";

export const handlingError = (erro: unknown) => {
  const newError = erro as CustomError;

  return {
    message: newError.message,
  };
};
