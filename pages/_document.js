import { Html, Head, Main, NextScript } from 'next/document'
// A custom Document can update the <html> and <body> tags used to render a Page. This file is only rendered on the server, so event handlers like onClick cannot be used in _document.

// To override the default Document, create the file pages/_document.js as shown below:

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

// Notes:
// <Html>, <Head />, <Main /> and <NextScript /> are required for the page to be properly rendered.

// Docs: https://nextjs.org/docs/advanced-features/custom-document