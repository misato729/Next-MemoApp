## URL
https://next-memo-app-five.vercel.app/

## 概要
- Next.jsの学習としてMarkdown対応のメモアプリを作る。
- 画面はメモ一覧セクションとメモ詳細セクションからなる。
- 画面数は表示専用ページと編集ページの2つである。

## ディレクトリ
```
src/
├── app/
│   ├── layout.tsx         // 全体レイアウト
│   ├── page.tsx           // / ルートページ（一覧画面）
│   ├── view/
│   │   └── page.tsx       // /view?id=xxx 表示専用ページ
│   └── edit/
│       └── page.tsx       // /edit?id=xxx 編集ページ
├── components/
│   ├── layout/
│   │   └── Header.tsx     // 共通ヘッダー
│   ├── memo/
│   │   ├── MemoList.tsx   // 一覧ページ用のメモリスト
│   │   ├── MemoCard.tsx   // 1件分のメモ（簡易表示）
│   │   ├── MemoDetail.tsx // 表示ページ用メモ詳細
│   │   └── MemoEdit.tsx   // 編集用フォーム
├── hooks/
│   ├── useMemoStore.ts
├── lib/
│   ├── utils.ts
├── types/
│   └── memo.ts            // Memo型定義
├── utils/
│   └── memo.ts            // 仮データの生成・検索用ユーティリティ
```

## コンポーネント
### 表示専用ページ
<img width="911" height="646" alt="スクリーンショット 2025-08-15 13 51 10" src="https://github.com/user-attachments/assets/fcfc91c9-b32c-4e2e-816a-a9d4bdbc34e9" />

### 編集ページ
- 編集画面
<img width="910" height="645" alt="スクリーンショット 2025-08-15 13 53 13" src="https://github.com/user-attachments/assets/40414ac1-749b-44d2-80d9-e0afcfd549bb" />

- プレビュー画面
<img width="911" height="642" alt="スクリーンショット 2025-08-15 13 54 42" src="https://github.com/user-attachments/assets/1a2c96e5-3311-4dd5-aa1c-bedbcafc0dd1" />


