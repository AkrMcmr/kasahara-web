// form-handler.js
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form'); // フォームのIDを適切に設定
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // デフォルトのフォーム送信を防ぐ
    const ContactType = {
      LESSON: 'レッスン',
      REQUEST: '演奏依頼',
      CONCERT: 'コンサート',
      OTHER: 'その他',
    };

    // フォームデータの取得
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: ContactType[formData.get('contactType').toUpperCase()],
      details: formData.get('message'),
    };

    // 基本的なバリデーション
    if (!data.name || !data.email || !data.phone || !data.subject) {
      showMessage('必須項目を入力してください', 'error');
      return;
    }

    // メール形式の簡単なチェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showMessage('正しいメールアドレスを入力してください', 'error');
      return;
    }

    // 電話番号形式の簡単なチェック（数字、ハイフン、括弧、スペースのみ許可）
    const phoneRegex = /^[\d\-\(\)\s]+$/;
    if (!phoneRegex.test(data.phone)) {
      showMessage(
        '正しい電話番号を入力してください（数字とハイフンのみ）',
        'error'
      );
      return;
    }

    // 電話番号の最小桁数チェック（ハイフンを除いて10桁以上）
    const phoneDigits = data.phone.replace(/[\-\(\)\s]/g, '');
    if (phoneDigits.length < 10) {
      showMessage('電話番号は10桁以上で入力してください', 'error');
      return;
    }

    // 送信中の状態表示
    submitButton.disabled = true;
    submitButton.textContent = '送信中...';

    try {
      // APIエンドポイントに送信
      const response = await fetch('/api/send-line', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // 成功時の処理
        showMessage(
          'お申し込みありがとうございます。確認次第ご連絡いたします。',
          'success'
        );
        form.reset(); // フォームのリセット
      } else {
        // エラー時の処理
        showMessage(result.error || '送信に失敗しました', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('ネットワークエラーが発生しました', 'error');
    } finally {
      // ボタン状態の復元
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });

  // メッセージ表示関数
  function showMessage(message, type) {
    // 既存のメッセージがあれば削除
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // メッセージ要素の作成
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    // スタイルの適用
    messageDiv.style.cssText = `
      padding: 12px 16px;
      margin: 16px 0;
      border-radius: 4px;
      font-weight: 500;
      ${
        type === 'success'
          ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
          : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      }
    `;

    // フォームの前に挿入
    form.parentNode.insertBefore(messageDiv, form);

    // 5秒後に自動削除
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
});
