import { create } from "zustand";
import { Memo } from "@/types/memo";
import { makeSeedMemos, MEMO_LS_KEY } from "@/utils/memo";

type MemoState = {
  memos: Memo[];
  ready: boolean;
  load: () => void;
  add: (partial: Pick<Memo, "title" | "content">) => string;
  update: (id: string, patch: Partial<Pick<Memo, "title" | "content">>) => void;
  remove: (id: string) => void;
  move: (activeId: string, overId: string) => void; // ←これ追加
};

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const a = arr.slice();
  const item = a.splice(from, 1)[0];
  a.splice(to, 0, item);
  return a;
}


// ストアの定義と初期値
export const useMemoStore = create<MemoState>((set, get) => ({
  memos: [],
  ready: false,
  // 初回ロード
  load: () => {
    if (get().ready) return;
    try {
      // SSR/ビルド時でも落ちないように typeof window !== "undefined" で localStorage を守っている
      const raw = typeof window !== "undefined" ? localStorage.getItem(MEMO_LS_KEY) : null;
      const parsed: Memo[] | null = raw ? JSON.parse(raw) : null;
      const memos = parsed && parsed.length ? parsed : makeSeedMemos();
      set({ memos, ready: true });
      // JSON 解析に失敗してもアプリが止まらないよう try/catch でフォールバック
    } catch {
      // データが空 or 取得できなければ makeSeedMemos() でサンプル1件を投入。
      // ready フラグで 一度しか読み込まない よう制御。useEffect(load, []) で呼ぶ想定。
      set({ memos: makeSeedMemos(), ready: true });
    }
  },
  add: ({ title, content }) => {
    const now = new Date().toISOString();
    // crypto.randomUUID() でID生成（依存なし・衝突しにくい）。
    const id = crypto.randomUUID();
    // 追加したら 配列の先頭 に差し込む（最新が上に来るUIのため）。
    const newMemo: Memo = { id, title, content, createdAt: now, updatedAt: now };
    // persist() で 状態更新と localStorage 保存 を同時に行う。
    set((s) => persist({ memos: [newMemo, ...s.memos] }, s));
    // 生成した id を返すので、画面遷移やURL更新 に即利用可能。
    return id;
  },
  update: (id, patch) => {
    const now = new Date().toISOString();
    // 対象IDのメモに patch（title / content のどちらか・両方）をマージ。
    set((s) =>
      persist(
        {
          // updatedAt を毎回更新して、更新順の把握に使えるように。
          memos: s.memos.map((m) => (m.id === id ? { ...m, ...patch, updatedAt: now } : m)),
        },
        s,
      ),
    );
  },
  // 指定IDを除いた配列にして保存。
  remove: (id) => set((s) => persist({ memos: s.memos.filter((m) => m.id !== id) }, s)),
  move: (activeId, overId) =>
    set((s) => {
      const from = s.memos.findIndex((m) => m.id === activeId);
      const to = s.memos.findIndex((m) => m.id === overId);
      if (from < 0 || to < 0 || from === to) return s; // 何もしない
      return persist({ memos: arrayMove(s.memos, from, to) }, s);
    }),
}));

// 保存ヘルパー persist()
function persist(partial: Partial<MemoState>, prev: MemoState): MemoState {
  const next = { ...prev, ...partial } as MemoState;
  // set のアップデータ関数内から呼び、状態と localStorage を同時更新
  if (typeof window !== "undefined") {
    // ストア全体は保存せず、memos 配列だけをキー MEMO_LS_KEY で保存 → 取り回しが楽。
    localStorage.setItem(MEMO_LS_KEY, JSON.stringify(next.memos));
  }
  return next;
}