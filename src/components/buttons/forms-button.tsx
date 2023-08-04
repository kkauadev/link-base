"use client";

import { Button } from "./button";

interface FormButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  backgroundColor: string;
  onClickMap?: Record<"click", (value: string) => void>;
}

export const FormButton = ({
  backgroundColor,
  onClickMap,
  text,
  type = "button",
}: FormButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!onClickMap) return;

    const onClick = onClickMap["click"];
    if (onClick) {
      onClick(e.currentTarget.value);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`w-36 p-[0.2rem] bg-${backgroundColor}-600`}
      type={type}
    >
      {text}
    </Button>
  );
};
