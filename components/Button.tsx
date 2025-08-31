"use client";

import { ReactNode } from "react";
import { CircleStackIcon } from "@heroicons/react/24/solid";

type Variant = "primary" | "secondary" | "danger" | "pagination" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  pagination: "bg-transparent border border-gray-500 text-gray-500 text-sm hover:bg-gray-500 hover:text-white",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
};

export default function Button({
  children,
  variant = "primary",
  iconLeft,
  iconRight,
  loading = false,  // default false
  className = "",  // default empty string
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${variantClasses[variant]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <CircleStackIcon className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {iconLeft && <span className="w-5 h-5">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="w-5 h-5">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
