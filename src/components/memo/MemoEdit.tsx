"use client";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemoStore } from "@/hooks/useMemoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function MemoEdit({ id }: { id?: string }) {
  const { memos, load, update, add } = useMemoStore();
  useEffect(() => { load(); }, [load]);
  const current = useMemo(() => memos.find((m) => m.id === id), [memos, id]);

  const [title, setTitle] = useState(current?.title ?? "");
  const [content, setContent] = useState(current?.content ?? "");
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    setTitle(current?.title ?? "");
    setContent(current?.content ?? "");
  }, [current?.id]);

  const onSave = () => {
    if (current) {
      update(current.id, { title, content });
    } else {
      const newId = add({ title: title || "新規メモ", content });
      // NOTE: caller side may navigate if needed
      history.replaceState(null, "", `/edit?id=${newId}`);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {mode === "edit" ? (
            <Button variant="secondary" onClick={() => setMode("preview")}>Preview</Button>
          ) : (
            <Button variant="secondary" onClick={() => setMode("edit")}>Back</Button>
          )}
        </div>
        <Button onClick={onSave}>Save</Button>
      </div>

      <div className="rounded-2xl border p-4 bg-card">
        <Input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 text-lg"
        />
        {mode === "edit" ? (
          <Textarea
            placeholder="# 見出し\n本文... (Markdown対応)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[50vh]"
          />
        ) : (
          <article className="prose max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}
