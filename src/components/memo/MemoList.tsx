"use client";
import { useEffect } from "react";
import { useMemoStore } from "@/hooks/useMemoStore";
import { MemoCard } from "./MemoCard";
import { Button } from "@/components/ui/button";

export default function MemoList() {
  const { memos, load, add } = useMemoStore();

  useEffect(() => { load(); }, [load]);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-3">
      <div className="flex gap-2">
        <Button className="w-full" onClick={() => add({ title: "新規メモ", content: "" })}>+ New</Button>
      </div>
      <ul className="space-y-2">
        {memos.map((m) => (<MemoCard key={m.id} memo={m} />))}
      </ul>
    </aside>
  );
}