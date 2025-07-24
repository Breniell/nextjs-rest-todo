import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-2xl shadow p-0">{children}</div>;
}

export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-4 py-3 border-b ${className}`.trim()}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`px-4 py-3 ${className}`.trim()}>{children}</div>;
}
