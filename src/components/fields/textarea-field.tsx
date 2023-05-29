"use client";

import { useRef, useEffect } from "react";
interface TextareaFieldProps {
  label: string;
  value: string;
  onChangeMap: Record<"onChange", (value: string) => void>;
}

export const TextareaField = ({
  label,
  value,
  onChangeMap,
}: TextareaFieldProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const onChange = onChangeMap["onChange"];
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <label className="block mb-1" htmlFor="input-folder-description">
        {label}
      </label>
      <textarea
        onChange={handleChange}
        value={value}
        ref={textareaRef}
        className="resize-none max-w-xl bg-tertiary w-full p-2 rounded outline-none"
        name="input-folder-description"
        id="input-folder-description"
      />
    </div>
  );
};
