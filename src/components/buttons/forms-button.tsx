"use client";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  backgroundColor: string;
  onClick?: () => void;
}

export const FormButton = ({
  backgroundColor,
  onClick,
  text,
  type = "button",
}: FormButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`ext-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-${backgroundColor}-600`}
      type={type}
    >
      {text}
    </button>
  );
};
