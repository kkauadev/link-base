"use client";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export const InputField = ({
  label,
  value,
  onChange,
  type = "text",
}: InputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block mb-1" htmlFor="input-folder-name">
        {label}
      </label>
      <input
        onChange={handleChange}
        value={value}
        className="bg-tertiary max-w-xl w-full px-2 py-1 rounded outline-none"
        type={type}
        name="input-folder-name"
        id="input-folder-name"
      />
    </div>
  );
};
