import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const font = Share_Tech_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLACK MIRROR LIST",
  description: "SISTEMA DE ACCESO RESTRINGIDO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${font.className} min-h-screen bg-black text-green-400`}>
        {children}
      </body>
    </html>
  );
}
