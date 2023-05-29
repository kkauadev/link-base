"use client";

interface InputFieldProps {
  label: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChangeMap: Record<"onChange", (value: string) => void>;
}

export const InputField = ({
  label,
  value,
  type = "text",
  placeholder = "",
  onChangeMap,
}: InputFieldProps) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const onChange = onChangeMap["onChange"];
    if (onChange) {
      onChange(e.target.value);
    }
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
        placeholder={placeholder}
      />
    </div>
  );
};
