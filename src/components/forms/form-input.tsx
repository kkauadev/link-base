import { InputHTMLAttributes } from "react";

export const FormInput = ({
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="text-lg py-[0.2rem] transition px-2 rounded-sm bg-tertiary outline-none hover:brightness-75"
      {...inputProps}
    />
  );
};
