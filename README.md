## URL
https://next-memo-app-five.vercel.app/

## 概要
Next.js（App Router）+ Zustand + shadcn/ui で作った**マークダウン対応メモアプリ**です。

データベースは不要で、**ブラウザのLocalStorageのみ**で動作します。

## ディレクトリ
```
src/
├── app/
│   ├── layout.tsx       // 全体レイアウト
│   ├── page.tsx         // / 一覧+詳細
│   ├── view/page.tsx    // /view?id=xxx 表示専用
│   └── edit/page.tsx    // /edit?id=xxx 編集用
│   └── globals.css
├── components/
│   ├── layout/Header.tsx
│   ├── memo/
│   │   ├── MemoList.tsx
│   │   ├── MemoCard.tsx
│   │   ├── MemoDetail.tsx
│   │   ├── MemoEdit.tsx
│   │   └── MemoView.tsx
├── hooks/
│   └── useMemoStore.ts  // Zustand store
├── types/
│   └── memo.ts
└── utils/
    └── memo.ts

```
## 技術スタック

 - Next.js 15 (App Router)
 - TypeScript
 - Zustand（状態管理）
 - shadcn/ui（UI コンポーネント）
 - react-markdown+ remark-gfm
 - TailwindCSS + oklch color theme
 - LocalStorage persistence

## 画面
- 閲覧画面
<img width="1440" height="663" alt="スクリーンショット 2025-08-21 12 29 11" src="https://github.com/user-attachments/assets/00122585-3c38-4808-9a83-829805d98e43" />

- 編集画面
  - 編集モード
<img width="1440" height="663" alt="スクリーンショット 2025-08-21 12 30 05" src="https://github.com/user-attachments/assets/4020a667-e871-493a-9756-8040208eda03" />
  - プレビューモード
<img width="1440" height="591" alt="スクリーンショット 2025-08-21 12 31 05" src="https://github.com/user-attachments/assets/818ff5bb-ada5-418d-abb3-ac96e750bea3" />


## 今後の展望
- 検索機能の追加
- レスポンシブ対応
- 認証機能の追加
- DB連携
