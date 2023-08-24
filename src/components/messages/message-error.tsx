import { IconClose } from "../icons";

interface FormButtonProps {
  message: string;
  closeMessage: () => void;
}

export const ErrorMessage = ({ message, closeMessage }: FormButtonProps) => {
  return (
    <aside className="flex justify-center bg-red-400 text-xl rounded p-3 absolute top-16 left-[35%] right-[35%]">
      <span>{message}</span>
      <button onClick={closeMessage}>
        <IconClose />
      </button>
    </aside>
  );
};
