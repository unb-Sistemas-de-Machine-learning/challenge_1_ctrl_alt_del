import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";

export const metadata: Metadata = {
  title: "Tá Certo Brasil?",
  description: "Site para checar fake news",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col flex-auto h-screen">
        <div className="justify-center items-center violet-border h-full p-2">
          <Header></Header>
          {children}
        </div>
      </body>
    </html>
  );
}
