import React from "react";

type Variant = "default" | "outline" | "destructive";
type Size = "sm" | "md";

const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
};

export function Button({
  children,
  variant = "default",
  size = "md",
  onClick,
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium focus:outline-none transition ${
        VARIANT_CLASSES[variant]
      } ${SIZE_CLASSES[size]}`}
    >
      {children}
    </button>
  );
}
