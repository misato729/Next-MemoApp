"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemoStore } from "@/hooks/useMemoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MemoEdit({ id }: { id?: string }) {
  const { memos, load, update, add, remove } = useMemoStore();
  const router = useRouter();

  useEffect(() => {
    load();
  }, [load]);

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
      history.replaceState(null, "", `/edit?id=${newId}`);
    }
  };

  const onDelete = () => {
    if (!current) return;
    remove(current.id);
    router.push("/");
  };

  return (
    <div className="space-y-3">
      {/* 操作ボタン */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {mode === "edit" ? (
            <Button variant="secondary" onClick={() => setMode("preview")}>
              Preview
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setMode("edit")}>
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {current && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>このメモを削除しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    削除する
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>

      {/* 本文エリア */}
      <div className="rounded-2xl border p-4 bg-card">
        <Input
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 text-lg"
        />
        {mode === "edit" ? (
          <Textarea
            placeholder="# 見出し\n本文... (Markdown対応)\n\n| A | B |\n|---|---|\n| 1 | 2 |"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[50vh]"
          />
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
