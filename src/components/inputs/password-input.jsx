import { Eye, EyeClosed } from "iconoir-react";
import { useState } from "react";

export default function PasswordInput({
  value,
  name,
  placeholder,
  handleChange,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={`${showPassword ? "text" : "password"}`}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`border ${error && "border-[var(--primary-red)]"}`}
      />
      <div className="input-icon">
        {showPassword ? (
          <Eye onClick={() => setShowPassword(!showPassword)} />
        ) : (
          <EyeClosed onClick={() => setShowPassword(!showPassword)} />
        )}
      </div>
    </div>
  );
}
