import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tá Certo Brasil?",
  description: "Site para checar fake news",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col flex-auto h-screen p-2">
          {children}
      </body>
    </html>
  );
}
