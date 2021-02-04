import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head />
        <body id="body" className="w-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
