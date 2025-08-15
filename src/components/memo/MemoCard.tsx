"use client";
import Link from "next/link";
import { Memo } from "@/types/memo";
import { Button } from "@/components/ui/button";

export function MemoCard({ memo }: { memo: Memo }) {
  return (
    <li className="rounded-xl border p-3 flex items-center justify-between gap-3 bg-card">
      <div>
        <h3 className="font-semibold line-clamp-1">{memo.title || "(無題)"}</h3>
        <p className="text-xs text-muted-foreground">{new Date(memo.updatedAt).toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm" variant="secondary"><Link href={`/view?id=${memo.id}`}>Open</Link></Button>
        <Button asChild size="sm"><Link href={`/edit?id=${memo.id}`}>Edit</Link></Button>
      </div>
    </li>
  );
}