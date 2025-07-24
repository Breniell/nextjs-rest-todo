import React from "react";

type Variant = "outline" | "success" | "destructive";

const VARIANT_CLASSES: Record<Variant, string> = {
  outline: "bg-gray-100 text-gray-800 border border-gray-300",
  success: "bg-green-100 text-green-800",
  destructive: "bg-red-100 text-red-800",
};

export function Badge({
  children,
  variant = "outline",
}: {
  children: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
        VARIANT_CLASSES[variant]
      }`}
    >
      {children}
    </span>
  );
}
