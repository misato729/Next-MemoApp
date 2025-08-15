"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full border-b bg-card/50 backdrop-blur px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold">MemoApp</Link>
      <nav className="flex gap-2">
        <Button asChild variant="ghost"><Link href="/">Home</Link></Button>
        <Button asChild variant="ghost"><Link href="/view">View</Link></Button>
      </nav>
    </header>
  );
}