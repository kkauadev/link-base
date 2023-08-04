"use client";

import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`w-full flex items-center justify-center text-lg p-2 rounded transition hover:brightness-75 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
