"use client";
import MemoDetail from "@/components/memo/MemoDetail";
import MemoEdit from "@/components/memo/MemoEdit";

// 表示モードに応じて詳細表示か編集画面を切り替えるコンポーネント
export default function MemoView({ id, mode }: { id?: string; mode: "detail" | "edit" }) {
  return (
    <section className="rounded-2xl border p-4 bg-accent/10">
      {/* modeが"detail"なら詳細表示、"edit"なら編集画面を表示 */}
      {mode === "detail" ? <MemoDetail id={id} /> : <MemoEdit id={id} />}
    </section>
  );
}