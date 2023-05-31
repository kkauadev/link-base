interface HomeButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  color: "green" | "blue" | "red";
  text: string;
}

export const HomeButton = ({
  color,
  isDisabled,
  onClick,
  text,
}: HomeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${
        isDisabled && "opacity-50 cursor-not-allowed"
      } h-[1.8rem] text-white w-24  rounded transition hover:brightness-75 bg-${color}-600`}
    >
      {text}
    </button>
  );
};
