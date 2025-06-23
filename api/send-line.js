// api/send-line.js
export default async function handler(req, res) {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSリクエスト（プリフライト）への対応
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POSTメソッドのみ許可
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 環境変数の確認
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userIds = process.env.LINE_USER_IDS.split(',');

    if (!channelAccessToken || !userId) {
      console.error('Missing environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // フォームデータの取得と検証
    const { name, email, phone, subject, details } = req.body;

    if (!name || !email || !phone || !subject) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // LINEメッセージの作成
    const message = `
🔔 新しいお申し込みがありました

👤 お名前: ${name}
📧 メール: ${email}
📞 電話番号: ${phone}
📝 用件: ${subject}
💬 詳細: ${details || '記載なし'}

送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
    `.trim();

    // LINE Messaging APIへのリクエスト
    for (const userId of userIds) {
      const lineResponse = await fetch(
        'https://api.line.me/v2/bot/message/push',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${channelAccessToken}`,
          },
          body: JSON.stringify({
            to: userId,
            messages: [
              {
                type: 'text',
                text: message,
              },
            ],
          }),
        }
      );

      if (!lineResponse.ok) {
        const errorData = await lineResponse.text();
        console.error('LINE API Error:', errorData);
        return res.status(500).json({ error: 'Failed to send LINE message' });
      }

      // 成功レスポンス
      return res.status(200).json({
        success: true,
        message: 'Form submitted and LINE notification sent successfully',
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
