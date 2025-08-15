import { v4 as uuid } from "uuid";
import type { Memo } from "@/types/memo";

export function makeSeedMemos(): Memo[] {
  const now = new Date().toISOString();
  return [
    {
      id: uuid(),
      title: "score-manager-backendのREADME.md",
      content: `# 概要\n\n本プロジェクトは...\n\n## 機能一覧\n- API レスポンス ...`,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export const MEMO_LS_KEY = "memo-app.memos";

export const findMemo = (memos: Memo[], id?: string | null) =>
  memos.find((m) => m.id === id);