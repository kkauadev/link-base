"use client";

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
    <button
      onClick={handleClick}
      className={`ext-white w-24 p-[0.1rem] rounded transition hover:brightness-75 bg-${backgroundColor}-600`}
      type={type}
    >
      {text}
    </button>
  );
};
