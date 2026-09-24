const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyTp8YX5B-N_c96N6Ftcd4Mthx7zrRnHENaxt25k3FKozwdttcPb6r2Nr-cCvXkW_RA/exec';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      error: 'Method Not Allowed'
    });
  }

  try {
    const body = req.body || {};

    const values = {
      company: String(body.company || '').trim(),
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim(),
      tel: String(body.tel || '').trim(),
      url: String(body.url || '').trim(),
      problem: String(body.problem || '').trim()
    };

    // 必須項目
    if (
      !values.company ||
      !values.name ||
      !values.email ||
      !values.problem
    ) {
      return res.status(400).json({
        ok: false,
        error: '必須項目が不足しています。'
      });
    }

    const params = new URLSearchParams(values);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params.toString(),
      redirect: 'follow'
    });

    if (!response.ok) {
      console.error(
        'Apps Script HTTP error:',
        response.status
      );

      return res.status(502).json({
        ok: false,
        error: '問い合わせの送信に失敗しました。'
      });
    }

    const responseText = await response.text();

    // Apps ScriptがGoogleフォーム登録完了後に返す成功マーカー
    if (!responseText.includes('lp_form_success')) {
      console.error(
        'Apps Script success marker not found:',
        responseText.slice(0, 500)
      );

      return res.status(502).json({
        ok: false,
        error: '問い合わせの登録を確認できませんでした。'
      });
    }

    return res.status(200).json({
      ok: true
    });

  } catch (error) {
    console.error('LP contact API error:', error);

    return res.status(500).json({
      ok: false,
      error: '送信処理でエラーが発生しました。'
    });
  }
};