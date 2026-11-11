import type { ReactNode } from "react";
import { InfoIcon } from "./Icons";

export function DemoNote({
  className = "",
  children = "Data demo — sekolah dan foto adalah contoh, bukan data resmi.",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <p className={`demo-note ${className}`}>
      <InfoIcon />
      <span>{children}</span>
    </p>
  );
}
