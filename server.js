const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5001;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // URLから相対パスに変換（"/"の場合は"index.html"を返す）
  let filePath = req.url === '/' ? 'index.html' : req.url;

  // URLにクエリパラメータがある場合、それを削除
  filePath = filePath.split('?')[0];

  // ファイルパスを絶対パスに変換
  filePath = path.join(__dirname, filePath);

  // ファイル拡張子を取得
  const extname = path.extname(filePath).toLowerCase();

  // デフォルトのコンテンツタイプ
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // ファイルを読み込む
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // ファイルが見つからない場合は404を返す
        console.log(`ファイルが見つかりません: ${filePath}`);
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('エラーが発生しました。サーバーログを確認してください。');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // サーバーエラーの場合
        console.error(`サーバーエラー: ${err.code}`);
        res.writeHead(500);
        res.end('エラーが発生しました。サーバーログを確認してください。');
      }
    } else {
      // 成功した場合、ファイルの内容を返す
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
  console.log(`http://localhost:${PORT} にアクセスしてください`);
});
