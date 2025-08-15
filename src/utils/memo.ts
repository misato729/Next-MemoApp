import { v4 as uuid } from "uuid";
import type { Memo } from "@/types/memo";

export function makeSeedMemos(): Memo[] {
  const now = new Date().toISOString();
  return [
    {
      id: uuid(),
      title: "TestTitle",
      content: `# タイトル \n- りんご \n- みかん \n \n| A | B | \n|---|---| \n| 1 | 2 | \n`,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export const MEMO_LS_KEY = "memo-app.memos";

export const findMemo = (memos: Memo[], id?: string | null) =>
  memos.find((m) => m.id === id);