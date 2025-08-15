"use client";
import Link from "next/link";
import { Memo } from "@/types/memo";
import { Button } from "@/components/ui/button";
import { useMemoStore } from "@/hooks/useMemoStore";
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

export function MemoCard({ memo }: { memo: Memo }) {
  const remove = useMemoStore((s) => s.remove);

  return (
    <li className="rounded-xl border p-3 flex items-center justify-between gap-3 bg-card">
      <div>
        <h3 className="font-semibold line-clamp-1">{memo.title || "(無題)"}</h3>
        <p className="text-xs text-muted-foreground">{new Date(memo.updatedAt).toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm" variant="secondary"><Link href={`/view?id=${memo.id}`}>Open</Link></Button>
        <Button asChild size="sm"><Link href={`/edit?id=${memo.id}`}>Edit</Link></Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="sm" variant="destructive">Delete</Button>
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
              <AlertDialogAction onClick={() => remove(memo.id)}>削除する</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
}
