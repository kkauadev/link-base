"use client";

import { useEffect } from "react";
interface SuccessMessageProps {
  message: string;
  onCloseMap: Record<"show", () => void>;
}

export const SuccessMessage = ({
  message,
  onCloseMap,
}: SuccessMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const onClose = onCloseMap["show"];
      if (onClose) {
        onClose();
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [onCloseMap]);

  return (
    <aside className="bg-green-400 text-xl rounded p-3 absolute top-16 left-[35%] right-[35%]">
      {message}
    </aside>
  );
};
