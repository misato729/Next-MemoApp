"use client";
import { useEffect } from "react";
import { useMemoStore } from "@/hooks/useMemoStore";
import { MemoCard } from "./MemoCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MemoList() {
  const { memos, load, add } = useMemoStore();
  const router = useRouter();

  useEffect(() => { load(); }, [load]);

  const onNew = () => {
    const id = add({ title: "新規メモ", content: "" });
    router.push(`/edit?id=${id}`);
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-3">
      <div className="flex gap-2">
        <Button className="w-full" onClick={onNew}>+ New</Button>
      </div>
      <ul className="space-y-2">
        {memos.map((m) => (<MemoCard key={m.id} memo={m} />))}
      </ul>
    </aside>
  );
}