import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="h-screen grid place-items-center">{children}</div>;
}
