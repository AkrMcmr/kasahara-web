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

## プロフィールページのタイムライン修正

- タイムラインコンポーネントがレスポンシブ表示で崩れていた問題を修正
- **PC サイズ（1024px 以上）**：
  - 日付幅を 14rem → 16rem に拡大
  - 縦線位置を 7rem → 16rem に調整
  - ドットに白いボーダーを追加して見やすく
  - 日付を primary カラーで強調表示
  - flex-shrink: 0 で日付幅固定
- **大画面（1200px 以上）**：さらに幅を 18rem に拡大
- **タブレット（1023px 以下）**：縦積みレイアウトに変更、左寄せ配置
- **スマホ（767px 以下）**：より小さい間隔とコンパクトな表示に調整

## ヘッダー・フッター共通化 (2025/01/11)

### 実装内容：

1. **共通パーツファイルの作成**

   - `includes/header.html` - ヘッダー共通 HTML
   - `includes/footer.html` - フッター共通 HTML

2. **JavaScript 共通化機能実装**

   - `js/script.js`に`loadCommonParts()`関数追加
   - fetch API を使った非同期読み込み
   - 各ページのプレースホルダーに HTML を挿入
   - エラーハンドリング付き（フォールバック対応）

3. **各 HTML ファイルの修正**
   - index.html, profile.html, lessons.html, contact.html
   - ヘッダー・フッター部分を`<div id="header-container">`と`<div id="footer-container">`に置き換え
   - コード重複を完全に解消

### 技術的詳細：

- JavaScript ES6 async/await 使用
- DOM 読み込み完了後に共通パーツを非同期読み込み
- 読み込み完了後にイベントリスナーを初期化
- 静的サイトでの動的 HTML 挿入を実現

### メリット：

- コードの重複を完全に解消
- ヘッダー・フッターの一元管理
- メンテナンス性の大幅向上
- 修正時は共通ファイルのみ変更すれば OK

### 注意点：

- ローカルサーバー環境でのテスト必要（CORS 制限あり）
- Vercel などのホスティング環境では正常動作

### 最終状態

- 全デバイスサイズでタイムラインが正しく表示
- Vercel 公開準備完了
- ファイル構造最適化済み
- ヘッダー・フッター共通化完了
- 開発環境とデプロイ環境の設定完了
