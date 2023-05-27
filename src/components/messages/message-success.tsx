"use client";

import { useEffect } from "react";
interface SuccessMessageProps {
  message: string;
  onClose: string;
}

export const SuccessMessage = ({ message, onClose }: SuccessMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const onCloseFn = JSON.parse(onClose);
      onCloseFn();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <aside className="bg-green-400 text-xl rounded p-3 absolute top-16 left-[35%] right-[35%]">
      {message}
    </aside>
  );
};
