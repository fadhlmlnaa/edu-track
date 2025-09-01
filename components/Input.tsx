import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error" | "success" | "disabled";
}

const Input: React.FC<InputProps> = ({ variant = "default", className, ...props }) => {
  const baseStyle =
    "w-full p-2 border rounded-md focus:outline-none focus:ring-1";

  const variantStyle = {
    default: "border-gray-300 focus:border-blue-400 focus:ring-blue-400",
    error: "border-red-400 focus:border-red-500 focus:ring-red-500",
    success: "border-green-400 focus:border-green-500 focus:ring-green-500",
    disabled: "border-gray-200 bg-gray-100 cursor-not-allowed",
  };

  return (
    <input
      {...props}
      disabled={variant === "disabled" || props.disabled}
      className={clsx(baseStyle, variantStyle[variant], className)}
    />
  );
};

export default Input;

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function NumberInput(props: NumberInputProps) {
  return (
    <Input
      type="number"
      variant="default"
      {...props}
      className={`w-full border rounded p-2 [appearance:textfield] 
                  [&::-webkit-outer-spin-button]:appearance-none 
                  [&::-webkit-inner-spin-button]:appearance-none 
                  ${props.className || ""}`}
      onWheel={(e) => (e.target as HTMLInputElement).blur()} // anti scroll naik/turun
    />
  );
}
