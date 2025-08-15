import "@/app/globals.css";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "MemoApp", description: "Markdown memo app (frontend-only)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="mx-auto max-w-6xl p-4">{children}</div>
      </body>
    </html>
  );
}