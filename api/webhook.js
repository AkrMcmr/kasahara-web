// api/webhook.js
import crypto from 'crypto';

export default async function handler(req, res) {
  // POSTメソッドのみ許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const channelSecret = process.env.LINE_CHANNEL_SECRET;

    if (!channelSecret) {
      console.error('LINE_CHANNEL_SECRET is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // リクエストボディを取得
    const body = JSON.stringify(req.body);

    // 署名検証
    const signature = req.headers['x-line-signature'];
    if (!signature) {
      console.error('No signature provided');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // HMAC-SHA256で署名を生成
    const hash = crypto
      .createHmac('sha256', channelSecret)
      .update(body, 'utf8')
      .digest('base64');

    // 署名を比較
    if (signature !== hash) {
      console.error('Invalid signature');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Webhookイベントの処理
    const events = req.body.events || [];

    for (const event of events) {
      console.log('=== LINE Webhook Event ===');
      console.log('Event Type:', event.type);
      console.log('User ID:', event.source?.userId);
      console.log('Message:', event.message?.text);
      console.log(
        'Timestamp:',
        new Date(event.timestamp).toLocaleString('ja-JP')
      );
      console.log('========================');

      // メッセージイベントの場合
      if (event.type === 'message' && event.message.type === 'text') {
        const userId = event.source.userId;
        const messageText = event.message.text;

        // User IDを環境変数設定用にログ出力
        console.log('🔥 USER ID FOR ENVIRONMENT VARIABLE: ' + userId);

        // 自動返信（オプション - 必要に応じて有効化）
        /*
        const replyToken = event.replyToken;
        await replyMessage(replyToken, 'メッセージを受信しました。フォーム通知の設定が完了しています。');
        */
      }
    }

    // LINEプラットフォームに200を返す（必須）
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// 返信メッセージ送信関数（オプション）
async function replyMessage(replyToken, message) {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!channelAccessToken) {
    console.error('LINE_CHANNEL_ACCESS_TOKEN is not set');
    return;
  }

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        replyToken: replyToken,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Reply message error:', errorData);
    }
  } catch (error) {
    console.error('Reply message error:', error);
  }
}
