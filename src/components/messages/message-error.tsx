"use client";

import { AiOutlineClose as IconClose } from "react-icons/ai";

interface FormButtonProps {
  message: string;
  onCloseMap: Record<string, () => void>;
}

export const ErrorMessage = ({ message, onCloseMap }: FormButtonProps) => {
  const handleClose = () => {
    const onClose = onCloseMap["show"];
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="flex justify-center bg-red-400 text-xl rounded p-3 absolute top-16 left-[35%] right-[35%]">
      <span>{message}</span>
      <button onClick={handleClose}>
        <IconClose />
      </button>
    </aside>
  );
};
