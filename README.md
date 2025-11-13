# EXPAND Corporate Site (Final Static)

このフォルダは、EXPANDの「名刺代わりサイト（A方式：静的HTML）」最終版です。
レスポンシブ対応・OGPタグ・後日Next.js移行しやすい構成。

## 構成
- index.html … トップ
- about.html … 会社概要（表組み）
- contact.html … お問い合わせ（メール/Googleフォーム）
- css/styles.css … 共通スタイル（ブランドカラー #0c3c78）
- assets/logo.svg, assets/favicon.svg … ロゴ/ファビコン

## 公開手順（GitHub → Vercel）
1. GitHubで新規リポジトリを作成（例：expand-site）
2. このフォルダ内のファイルをアップロード（直下に index.html がある構成）
3. Vercelにログイン → New Project → Import Git Repository → 該当リポジトリを選択
4. Framework Preset: **Other**、Build設定は空欄のまま Deploy
5. ドメイン接続：Settings → Domains で `fs-expand.co.jp` を追加
   - CloudflareのDNS
     - A @ → 76.76.21.21（検証時は DNS only、完了後は Proxied 推奨）
     - CNAME www → cname.vercel-dns.com（同上）

## メンテナンス
- テキスト更新：各HTMLを直接編集してCommit
- デザイン更新：css/styles.css
- 画像差し替え：assets/ 配下（ファイル名はそのままだとリンク変更が不要）

## Next.jsへの移行ポイント（B方式）
- `index.html` の構造は Next.js の `app/page.tsx` へ移植しやすい階層
- 画像は `/public/assets/*` にコピーでOK
- ルーティングは `/about`, `/contact` をそのまま再現可能
