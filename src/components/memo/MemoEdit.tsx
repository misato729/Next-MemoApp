"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMemoStore } from "@/hooks/useMemoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
// 先頭に追記
import { toast } from "sonner";

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
  //ストアとの接続
  const { memos, load, update, add, remove } = useMemoStore();
  // Next.jsのルーターを使用
  const router = useRouter();

  // 初期ロード
  useEffect(() => {
    load();
  }, [load]);
  // URLのクエリパラメータ id から該当するメモを探す
  const current = useMemo(() => memos.find((m) => m.id === id), [memos, id]);
  // 編集用の状態管理
  const [title, setTitle] = useState(current?.title ?? "");
  const [content, setContent] = useState(current?.content ?? "");
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  // メモが変更されたときにタイトルと内容を更新
  useEffect(() => {
    setTitle(current?.title ?? "");
    setContent(current?.content ?? "");
  }, [current?.id]);

  // 保存ボタンのハンドラー：既存メモなら update, 新規メモなら add, 新規作成したときはURLを新しいidに置き換え
  const onSave = useCallback((): string => {
    if (current) {
      update(current.id, { title, content });
      toast.success("保存しました", { description: new Date().toLocaleString() }); 
      return current.id;
    } else {
      const newId = add({ title: title || "新規メモ", content });
      router.replace(`/edit?id=${newId}`);
      toast.success("新規メモを保存しました", { description: new Date().toLocaleString() }); 
      return newId;
    }
  }, [current, title, content, update, add, router]);
  // クリック時に保存→viewへ
  const handleSaveAndView = useCallback(() => {
    const savedId = onSave();
    router.push(`/view?id=${savedId}`);
  }, [onSave, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mac = navigator.platform.toLowerCase().includes("mac");
      if ((mac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSave]);

  // 削除ボタンのハンドラー：該当メモを削除し、トップページへ戻る
  const onDelete = useCallback(() => {
    if (!current) return;
    remove(current.id);
    toast.success("削除しました"); 
    router.push("/");
  }, [current, remove, router]);

  return (
    <div className="space-y-3">
      {/* 操作ボタン */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {mode === "edit" ? (
            <Button
              variant="secondary"
              onClick={() => setMode("preview")}
              className="transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Preview
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => setMode("edit")}
              className="transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Back
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {current && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Delete
                </Button>
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
                  <AlertDialogAction asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={onDelete}
                      className="transition-transform active:scale-95"
                    >
                      削除する
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button
            onClick={handleSaveAndView}
            className="transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Save
          </Button>
        </div>
      </div>

      {/* 本文エリア */}
      <div className="rounded-2xl border p-4 bg-card">
        {mode === "edit" ? (
          <Input
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 text-lg"
          />
        ) : (
          <h1 className="mb-3 text-xl font-bold">{title || "(無題)"}</h1>
        )}
        {mode === "edit" ? (
          <Textarea
            placeholder={`Markdown記法が使えます
  例: # 見出し, - リスト, | 表 |`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[50vh]"
          />
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} >
              {content|| "(本文がありません)"}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
