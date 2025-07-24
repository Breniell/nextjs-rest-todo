import React from "react";

// Conteneur principal : colonne flexible, overflow caché
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex flex-col bg-white rounded-2xl shadow overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

// En‑tête responsive : colonne sur mobile, ligne sur sm+, alignements et gap
export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 py-3 border-b",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

// Contenu : prend tout l'espace restant
export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "flex-1 px-4 py-3",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
