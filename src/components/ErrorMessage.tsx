import type { ReactNode } from "react";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center">{children}</p>;
};

export default ErrorMessage;
