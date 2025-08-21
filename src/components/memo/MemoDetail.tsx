"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { useMemoStore } from "@/hooks/useMemoStore";

export default function MemoDetail({ id }: { id?: string }) {
  const router = useRouter();
  const { memos, load } = useMemoStore();

  // 初回ロード
  useEffect(() => {
    load();
  }, [load]);

  // 指定IDのメモ。なければ先頭メモにフォールバック
  const memo = useMemo(() => {
    if (!memos?.length) return undefined;
    const found = id ? memos.find((m) => m.id === id) : undefined;
    return found ?? memos[0];
  }, [memos, id]);

  // 何もない場合の空状態
  if (!memo) {
    return (
      <div className="text-sm text-muted-foreground">
        メモがまだありません。
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* タイトル行 */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="mb-1 text-xl font-bold">
            {memo.title || "(無題)"}
          </h1>
          <p className="text-xs text-muted-foreground">
            更新: {new Date(memo.updatedAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            className="transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Link href={`/edit?id=${memo.id}`}>Edit</Link>
          </Button>
        </div>
      </div>

      {/* 本文（Markdown） */}
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {memo.content || "（本文がありません）"}
        </ReactMarkdown>
      </div>
    </div>
  );
}
