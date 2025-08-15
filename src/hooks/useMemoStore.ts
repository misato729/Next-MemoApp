import { create } from "zustand";
import { Memo } from "@/types/memo";
import { makeSeedMemos, MEMO_LS_KEY } from "@/utils/memo";

type MemoState = {
  memos: Memo[];
  ready: boolean;
  load: () => void;
  add: (partial: Pick<Memo, "title" | "content">) => string; // returns id
  update: (id: string, patch: Partial<Pick<Memo, "title" | "content">>) => void;
  remove: (id: string) => void;
};

export const useMemoStore = create<MemoState>((set, get) => ({
  memos: [],
  ready: false,
  load: () => {
    if (get().ready) return;
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(MEMO_LS_KEY) : null;
      const parsed: Memo[] | null = raw ? JSON.parse(raw) : null;
      const memos = parsed && parsed.length ? parsed : makeSeedMemos();
      set({ memos, ready: true });
    } catch {
      set({ memos: makeSeedMemos(), ready: true });
    }
  },
  add: ({ title, content }) => {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const newMemo: Memo = { id, title, content, createdAt: now, updatedAt: now };
    set((s) => persist({ memos: [newMemo, ...s.memos] }, s));
    return id;
  },
  update: (id, patch) => {
    const now = new Date().toISOString();
    set((s) =>
      persist(
        {
          memos: s.memos.map((m) => (m.id === id ? { ...m, ...patch, updatedAt: now } : m)),
        },
        s,
      ),
    );
  },
  remove: (id) => set((s) => persist({ memos: s.memos.filter((m) => m.id !== id) }, s)),
}));

function persist(partial: Partial<MemoState>, prev: MemoState): MemoState {
  const next = { ...prev, ...partial } as MemoState;
  if (typeof window !== "undefined") {
    localStorage.setItem(MEMO_LS_KEY, JSON.stringify(next.memos));
  }
  return next;
}