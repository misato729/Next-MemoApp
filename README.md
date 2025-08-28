## URL
https://next-memo-app-five.vercel.app/

## 概要
Next.js（App Router）+ Zustand + shadcn/ui を用いて開発した、**Markdown対応のシンプルなメモアプリ**です。

データベースは不要で、**ブラウザのLocalStorageのみ**で動作します。

## 背景
フロントエンドのフレームワークはVue.jsしか触れたことがなかったため、  
React/Next.jsの学習としてCRUD操作を一通りできるWebアプリを作ろうと思ったから。

## 主な機能
- メモの作成・編集・削除
- Markdown記法対応
- 編集時のプレビュー表示
- メモの一覧表示・詳細表示

## 状態管理（Zustand）
コード→[useMemoStore.ts](https://github.com/misato729/Next-MemoApp/blob/main/src/hooks/useMemoStore.ts)  
Zustandを使って、メモ一覧や選択中のメモなどの状態をグローバルに管理しています。  
また、`persist` 関数を通じて、LocalStorageに状態を保存することで、ページをリロードしてもメモが保持されるようにしています。

主な役割：
- メモ一覧の保持とCRUD操作（add, update, remove）
- 並び替え機能（move）
- LocalStorageとの連携（load, persist）
- 初期データの投入とエラーハンドリング（makeSeedMemos）

## 技術スタック

 - Next.js 15 (App Router)
 - TypeScript
 - Zustand（状態管理）
 - shadcn/ui（UI コンポーネント）
 - react-markdown+ remark-gfm
 - TailwindCSS + oklch color theme
 - LocalStorage persistence

## CI/CD
- GitHub Actionsを使用して、mainブランチへのプッシュ時に以下の処理を自動実行します。
  - ESLintによるコードの静的解析
  - TypeScriptによる型チェック
  - アプリケーションのビルド
- 上記の処理に問題がなければ、Vercelにより自動的に本番環境へデプロイされます。

## 画面
- 閲覧画面
<img width="1440" height="663" alt="スクリーンショット 2025-08-21 12 29 11" src="https://github.com/user-attachments/assets/00122585-3c38-4808-9a83-829805d98e43" />

- 編集画面
  - 編集モード
<img width="1440" height="663" alt="スクリーンショット 2025-08-21 12 30 05" src="https://github.com/user-attachments/assets/4020a667-e871-493a-9756-8040208eda03" />
  - プレビューモード
<img width="1440" height="591" alt="スクリーンショット 2025-08-21 12 31 05" src="https://github.com/user-attachments/assets/818ff5bb-ada5-418d-abb3-ac96e750bea3" />


## 今後の展望
- 🔍 検索機能の追加（メモ数が増えたときのUX向上）
- 📱 レスポンシブ対応（スマホでも使いやすく）
- 🔐 認証機能の追加（ユーザーごとのメモ管理）
- 🗄️ DB連携（本格的なバックエンド連携の練習）

