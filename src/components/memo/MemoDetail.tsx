"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemoStore } from "@/hooks/useMemoStore";
import { useEffect, useMemo } from "react";

export default function MemoDetail({ id }: { id?: string }) {
  const { memos, load } = useMemoStore();

  useEffect(() => {
    load();
  }, [load]);

  const memo = useMemo(
    () => memos.find((m) => m.id === id) ?? memos[0],
    [memos, id]
  );

  if (!memo) {
    return <p className="text-sm text-muted-foreground">メモがありません。</p>;
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">{memo.title || "(無題)"}</h1>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {memo.content || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
}
