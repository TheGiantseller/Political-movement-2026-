import type { Metadata } from "next";
import "./globals.css";
import { LayoutShell } from "@/components/site";
export const metadata: Metadata = { title: { default: "ROMÂNIA 2030 — Blueprint național de politici publice", template: "%s | ROMÂNIA 2030" }, description: "Catalog civic independent de propuneri de reformă pentru România. Document de lucru, cu surse, limitări și întrebări deschise.", applicationName: "ROMÂNIA 2030", robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="ro" data-scroll-behavior="smooth"><body><LayoutShell>{children}</LayoutShell></body></html>; }
