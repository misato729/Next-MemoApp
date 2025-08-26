"use client";
import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMemoStore } from "@/hooks/useMemoStore";
import { MemoCard } from "./MemoCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MemoList() {
  // Zustandのストアから状態と関数を取得
  const { memos, load, add, move } = useMemoStore();
  // Next.jsのルーターを使用
  const router = useRouter();
  // ドラッグオーバー中のメモIDを状態で管理
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  // 画面遷移などのための状態遷移中フラグ
  const [isPending, startTransition] = useTransition();

  // 初期ロード：コンポーネントが表示されたときに、LocalStorageからメモ一覧を読み込む
  useEffect(() => { load(); }, [load]);

  // 新規メモ作成ハンドラー
  const onNew = () => {
    // startTransitionで状態遷移中フラグを管理。遷移中はボタンを無効化してローダーを表示
    startTransition(() => {
      // add()で新しいメモを追加し、そのIDを取得
      const id = add({ title: "新規メモ", content: "" });
      toast.message("新規メモを作成しました");
      // 生成したIDを使って編集画面に遷移
      router.push(`/edit?id=${id}`);
    });
  };

  // ドラッグアンドドロップのハンドラー群
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
        <Button
          className="w-full transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50"
          onClick={onNew}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Opening..." : "+ New"}
        </Button>
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
