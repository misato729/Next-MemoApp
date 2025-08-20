"use client";
import { useEffect, useState } from "react";
import { useMemoStore } from "@/hooks/useMemoStore";
import { MemoCard } from "./MemoCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MemoList() {
  const { memos, load, add, move } = useMemoStore();
  const router = useRouter();
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => { load(); }, [load]);

  const onNew = () => {
    const id = add({ title: "新規メモ", content: "" });
    router.push(`/edit?id=${id}`);
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    // idをドラッグデータに乗せる
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, overId: string) => {
    e.preventDefault(); // これがないとdropが発火しない
    e.dataTransfer.dropEffect = "move";
    setDragOverId(overId);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, overId: string) => {
    e.preventDefault();
    const activeId = e.dataTransfer.getData("text/plain");
    setDragOverId(null);
    if (!activeId || activeId === overId) return;
    move(activeId, overId); // ← 並び替え＆保存
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-3">
      <div className="flex gap-2">
        <Button className="w-full" onClick={onNew}>+ New</Button>
      </div>

      <ul className="space-y-2">
        {memos.map((m) => {
          const isOver = dragOverId === m.id;
          return (
            <li
              key={m.id}
              draggable
              onDragStart={(e) => handleDragStart(e, m.id)}
              onDragOver={(e) => handleDragOver(e, m.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, m.id)}
              className={[
                "rounded-xl border bg-card",
                // ドロップ対象の視覚フィードバック
                isOver ? "ring-2 ring-primary/50" : "",
              ].join(" ")}
            >
              <MemoCard memo={m} />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
