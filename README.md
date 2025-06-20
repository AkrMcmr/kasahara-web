# 笠原悠郷公式ウェブサイト

クラシックサックス奏者・笠原悠郷の公式ウェブサイトです。

## 🎵 概要

フランス留学経験を活かした本格的なクラシックサックスレッスンを提供する笠原悠郷のポートフォリオサイトです。

## 📁 プロジェクト構造

```
kasahara-web/
├── prototype/          # メインのウェブサイトファイル
│   ├── index.html     # ホームページ
│   ├── profile.html   # プロフィールページ
│   ├── lessons.html   # レッスン情報
│   ├── contact.html   # お問い合わせ
│   ├── css/           # スタイルシート
│   ├── js/            # JavaScript
│   ├── images/        # 画像ファイル
│   ├── package.json   # プロジェクト設定
│   ├── vercel.json    # Vercel設定
│   └── server.js      # 開発用サーバー
└── docs/              # 設計資料
```

## 🚀 ローカル開発

```bash
cd prototype
node server.js
```

http://localhost:5001 でアクセス可能

## 🌐 Vercel での公開

このサイトは Vercel で公開されています。

- 静的ファイル配信に最適化
- 自動デプロイメント対応
- CDN 配信

## 🛠 技術スタック

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (Vanilla)
- Node.js (開発用サーバー)
- Vercel (ホスティング)

## �� ライセンス

MIT License
