"use client";

import { AiOutlineClose as IconClose } from "react-icons/ai";

interface FormButtonProps {
  message: string;
  onClose: string;
}

export const ErrorMessage = ({ message, onClose }: FormButtonProps) => {
  const handleClose = () => {
    const onCloseFn = JSON.parse(onClose);
    onCloseFn();
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
