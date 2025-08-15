"use client";
import MemoDetail from "@/components/memo/MemoDetail";
import MemoEdit from "@/components/memo/MemoEdit";

export default function MemoView({ id, mode }: { id?: string; mode: "detail" | "edit" }) {
  return (
    <section className="rounded-2xl border p-4 bg-accent/10">
      {mode === "detail" ? <MemoDetail id={id} /> : <MemoEdit id={id} />}
    </section>
  );
}