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
  move: (activeId: string, overId: string) => void;
};

// 配列の順番を並び替える関数（moveで使う）
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
  
  // LocalStorageからメモ一覧を読み込む関数
  load: () => {
    // ready が true なら何もしない（2回読み込まないように）
    if (get().ready) return;
    try {
      // localStorage.getItem() で保存されたメモを取得
      // SSR/ビルド時でも落ちないように typeof window !== "undefined" で localStorage を守っている
      const raw = typeof window !== "undefined" ? localStorage.getItem(MEMO_LS_KEY) : null;
      // JSON.parse() で配列に変換
      const parsed: Memo[] | null = raw ? JSON.parse(raw) : null;
      // データがなければ makeSeedMemos() でサンプルメモを1件作る
      const memos = parsed && parsed.length ? parsed : makeSeedMemos();
      // set() で memos と ready を更新
      set({ memos, ready: true });
      // JSON 解析に失敗してもアプリが止まらないよう try/catch でフォールバック
    } catch {
      // データが空 or 取得できなければ makeSeedMemos() でサンプル1件を投入。
      // ready フラグで 一度しか読み込まない よう制御。useEffect(load, []) で呼ぶ想定。
      set({ memos: makeSeedMemos(), ready: true });
    }
  },
  
  // 新しいメモを追加する関数。引数は title と content。
  add: ({ title, content }) => {
    const now = new Date().toISOString();
    // crypto.randomUUID() でID生成（依存なし・衝突しにくい）。
    const id = crypto.randomUUID();
    // createdAt と updatedAt を現在時刻で設定
    // 新しいメモを配列の先頭に追加（新しい順に表示するため）
    const newMemo: Memo = { id, title, content, createdAt: now, updatedAt: now };
    // persist() で 状態更新と localStorage 保存 を同時に行う。
    set((s) => persist({ memos: [newMemo, ...s.memos] }, s));
    // 生成した id を返すので、画面遷移やURL更新 に即利用可能。
    return id;
  },
  
  // 既存のメモを更新する関数。
  update: (id, patch) => {
    const now = new Date().toISOString();
    // 対象IDのメモに patch（title / content のどちらか・両方）をマージ。
    set((s) =>
      //persist() で保存
      persist(
        {
          // updatedAt を毎回更新して、更新順の把握に使えるように。
          memos: s.memos.map((m) => (m.id === id ? { ...m, ...patch, updatedAt: now } : m)),
        },
        s,
      ),
    );
  },
  
  // 指定したIDのメモを削除する関数。
  // filter() で対象メモを除外
  remove: (id) => set((s) => persist({ memos: s.memos.filter((m) => m.id !== id) }, s)),
  
  //メモの並び順を変更する関数。
  move: (activeId, overId) =>
    set((s) => {
      // from と to の位置を計算して、並び替え
      const from = s.memos.findIndex((m) => m.id === activeId);
      const to = s.memos.findIndex((m) => m.id === overId);
      if (from < 0 || to < 0 || from === to) return s; // 何もしない
      // arrayMove() という関数で配列の順番を入れ替える
      // persist() で保存
      return persist({ memos: arrayMove(s.memos, from, to) }, s);
    }),
}));

// 状態を更新しつつ、LocalStorageにも保存する関数。
//partial（変更したい部分）と prev（現在の状態）を合成
function persist(partial: Partial<MemoState>, prev: MemoState): MemoState {
  const next = { ...prev, ...partial } as MemoState;
  // set のアップデータ関数内から呼び、状態と localStorage を同時更新
  if (typeof window !== "undefined") {
    // ストア全体は保存せず、memos 配列だけをキー MEMO_LS_KEY で保存 → 取り回しが楽。
    localStorage.setItem(MEMO_LS_KEY, JSON.stringify(next.memos));
  }
  return next;
}
