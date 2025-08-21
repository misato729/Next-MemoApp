// MemoCard.tsx
"use client";
import Link from "next/link";
import { Memo } from "@/types/memo";
import { Button } from "@/components/ui/button";
import { useMemoStore } from "@/hooks/useMemoStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { useState } from "react";

export function MemoCard({ memo }: { memo: Memo }) {
  const remove = useMemoStore((s) => s.remove);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className="rounded-xl border p-3 flex items-center justify-between gap-3 bg-card">
      {/* 押したときに少し縮む＋hoverで色変化 */}
      <Link
        href={`/view?id=${memo.id}`}
        className="group block flex-1 min-w-0"
        prefetch={false}
      >
        <div className="rounded-md p-1 transition
                        hover:bg-accent/60 active:scale-[0.99]">
          <h3 className="font-semibold line-clamp-1">
            {memo.title || "(無題)"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {new Date(memo.updatedAt).toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="flex gap-2 shrink-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
              className="transition active:scale-95"
              onClick={(e) => e.stopPropagation()}
            >
              Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>このメモを削除しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。ローカル保存されたデータから完全に削除されます。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>

              {/* 削除アクションにスピナー＋トースト */}
              <AlertDialogAction asChild>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={deleting}
                  onClick={async () => {
                    setDeleting(true);
                    const id = `del-${memo.id}`;
                    toast.loading("削除中…", { id });
                    try {
                      await Promise.resolve(remove(memo.id)); // 非同期化しておく
                      toast.success("削除しました", { id });
                    } catch (e) {
                      toast.error("削除に失敗しました", { id });
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  削除する
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
