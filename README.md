# HTML STARTER

![node](https://img.shields.io/badge/version-0.0.0-blue.svg)

---

## 事前に用意するもの

- node.js (version 12.22.1)
  ![node](https://img.shields.io/badge/node-12.22.1-green.svg)

## 環境構築

開発に使う npm パッケージをインストール

```
npm i
```

あるいは、

```
yarn
```

## ファイル構成

- `public`
  - Web 公開されるファイルの置き場所。
- `frontend`
  - `package.json`
    - 依存する npm パッケージに関する設定ファイル。
  - `webpack.config.js` / `webpack.config.base.js`
    - webpack に関する設定ファイル。
    - データを JSON で管理したい場合、`frontend`配下に`data`ディレクトリを作成し JSON データを格納してください。`htmlTemplates`内の`locals`に`readConfig`を使って追加できます。
  - `src/scss`, `src/js`, `src/pug`
    - ビルドに必要な各種ソースコードです。
  - `src/img`
    - 使用する画像ファイルはこちらに入れてください。

開発用ブラウザ（ポート 3000 または 3001）は静的ページのみ。

## 開発手順

- `npm start` / `yarn start`
  - 開発用ブラウザを立ち上げ、その後ソースコードに修正があれば自動ブラウザ更新。
- `npm run build` / `yarn build`
  - ファイルをビルドするだけのコマンド。
- `npm run build-dev` / `yarn build-dev`
  - テストアップ用にファイルをビルドするだけのコマンド。

## 更新履歴

- 2021.09.22 Google Fonts の読み込み記述追加（2021.09.22 時点での記述方法）

## 使用言語

- HTML テンプレート: [pug](https://pugjs.org/api/getting-started.html)
- CSS メタ言語: [Sass(scss)](http://sass-lang.com/)
- Javascript: [ES2015(ECMAScript 6)](https://babeljs.io/docs/learn-es2015/)

## 対応ブラウザ

- 各種モダンブラウザ最新バージョン・IE11 以上
  - 対応ブラウザを変更する場合、`package.json`の`browserlist`を修正することをお忘れなく

## 依存ライブラリ

`npm install`でインストールされるライブラリ（一部）です。
全てを理解していなくても、開発は問題なく行えますが、挙動に問題がある場合・カスタマイズしたい場合などに参照してみてください。

- [Babel](https://babeljs.io/)
- [Reset CSS](http://meyerweb.com/eric/tools/css/reset/)
- [PostCSS](http://postcss.org/)
- [webpack](https://webpack.js.org/)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [webpack-route-data-mapper](https://github.com/fnobi/webpack-route-data-mapper)
  - 指定したテンプレートをまとめて html として書き出し対象にする（html-webpack-plugin のラッパー）
  - オプションを組み合わせることで、json データに基いて HTML を大量生成する、といった使い方も可能。詳しくはリンク先の README にて。
