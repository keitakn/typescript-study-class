# typescript-study-class

[![ci](https://github.com/keitakn/typescript-study-class/actions/workflows/ci.yml/badge.svg)](https://github.com/keitakn/typescript-study-class/actions/workflows/ci.yml)

これは 初心者向けの [TypeScript 勉強会](https://www.notion.so/TypeScript-04a3a81707a84758a87dd29e4bf84d0a) で利用したサンプルコード集です。

## Getting Started

Node.js のインストールが必要です。

18 系の最新で動作します。

### 依存 Package のインストール

プロジェクトルートで以下を実行します。

```
npm ci
```

### サーバーの起動

以下でライブリロードが有効な状態でサーバーを起動します。

```
npm run dev
```

`curl -v http://localhost:3000` を実行して以下のレスポンスが返ってきたら正常にサーバーが起動しています。

## 主要な npm script

### test

`npm run test` で テストコードを実行します。

### build

TypeScript の Build を行います。

Build によって生成されたソースコードは `dist/` に保存されます。

### start

Build されたソースコードを元にサーバーを起動します。

こちらはライブリロードが効かないので開発時は `npm run dev` のほうが便利です。

### lint

`npm run lint` で Linter の実行を行います。

ESLint、Prettier を内部で利用しています。

### format

`npm run format` で formatter の実行を行います。

Linter に違反するコードの一部はこれで修正可能です。
