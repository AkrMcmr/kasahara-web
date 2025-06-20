# 学習記録

## プロジェクト概要 - 笠原悠郷様のウェブサイト

- クラシックサックス奏者のポートフォリオサイト
- 静的 HTML ファイル（index.html, profile.html, lessons.html, contact.html）
- CSS、JavaScript、画像ファイルを含む
- 現在 Node.js サーバー（server.js）でローカル開発している

## Vercel 公開準備の要点

- 静的サイトなので Vercel に最適
- package.json が存在しない可能性（要確認・作成）
- vercel.json での設定が必要かもしれない
- GitHub との連携が必要

## 現在のファイル構造

- prototype/フォルダがメインコンテンツ
- css/, js/, images/フォルダを含む
- server.js は開発用（本番不要）

## Vercel 公開準備で作成したファイル

- package.json - プロジェクト設定
- vercel.json - Vercel 用設定（静的サイト最適化）
- .gitignore - Git 除外ファイル設定
- README.md - プロジェクト説明書

## Vercel 設定のポイント

- cleanUrls: true - 拡張子なし URL を有効化
- trailingSlash: false - 末尾スラッシュを無効化
- Cache-Control 設定 - 86400 秒（24 時間）のキャッシュ設定

## Vercel エラー対応

- 「No Output Directory named "public" found」エラーが発生
- 原因：Vercel が出力ディレクトリを探していたが、静的サイトなので不要
- 解決策：prototype フォルダの内容をプロジェクトルートに移動
- vercel.json をシンプルな静的サイト用設定に変更

## ファイル構造の最適化

- prototype フォルダを削除してファイル重複を解消
- プロジェクトルートで直接開発する構成に変更
- README.md とドキュメントを更新してファイル構造を反映
