"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemoStore } from "@/hooks/useMemoStore";
import { useEffect, useMemo } from "react";

export default function MemoDetail({ id }: { id?: string }) {
  const { memos, load } = useMemoStore();
  useEffect(() => { load(); }, [load]);
  const memo = useMemo(() => memos.find((m) => m.id === id) ?? memos[0], [memos, id]);
  if (!memo) return <p className="text-sm text-muted-foreground">メモがありません。</p>;

  return (
    <article className="prose max-w-none dark:prose-invert">
      <h1>{memo.title || "(無題)"}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{memo.content || ""}</ReactMarkdown>
    </article>
  );
}