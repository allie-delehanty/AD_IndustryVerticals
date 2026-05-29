import { Head, Html, Main, NextScript } from 'next/document';
import { ASCRS_FONT_LINK, ascrsBrandCssText } from '@/constants/ascrsBrand';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={ASCRS_FONT_LINK} />
        <style id="ascrs-brand-vars">{`:root { ${ascrsBrandCssText} }`}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
