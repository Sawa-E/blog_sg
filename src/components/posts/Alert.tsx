import { Callout, type CalloutType } from "./Callout";
import type { ReactNode } from "react";

type AlertProps = {
  type?: Extract<CalloutType, "info" | "success" | "warning" | "error">;
  title?: string;
  children: ReactNode;
};

export function Alert({ type = "info", title, children }: AlertProps) {
  return (
    <Callout type={type} title={title}>
      {children}
    </Callout>
  );
}
