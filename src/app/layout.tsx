import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";

import {
  generateMetadata,
  generateViewport,
} from "@/utils/seo/generate-page-metadata";
import { getSiteStructuredData } from "@/utils/seo/structured-data";

import { LazyCookie } from "@/components/common/Cookie";
import { AdaptiveGrid } from "@/components/common/grid";
import { ReducedMotion } from "@/components/common/reduced-motion";
import { Preloader } from "@/components/common/preloader";
import { ScrollLayout } from "@/layouts/scroll-layout";

import "@/app/globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = generateMetadata();
export const viewport: Viewport = generateViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/af/00000000000000003b9b12d8/l?primer=7cd2d5b69c453870e6e9999139b86b86f09658a0000000000000000000000000&fvd=n4&v=3" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/proxima-nova-2" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/futura-pt" />
        {/* Decide before first paint whether the intro loader is skipped (repeat visit or reduced motion). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{if(sessionStorage.getItem('aw-loaded')||window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('aw-skip-loader')}}catch(e){}})();",
          }}
        />
        <noscript>
          <style>{"[data-preloader]{display:none!important}[data-preloader-content]{visibility:visible!important}"}</style>
        </noscript>
        {/* Apply the saved theme before first paint to avoid a flash. Default is dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.classList.add('light')}}catch(e){}})();",
          }}
        />
      </head>
      <body className={`${onest.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <ScrollLayout>
          <AdaptiveGrid />
          <ReducedMotion />
          <LazyCookie />
          <Preloader>{children}</Preloader>
        </ScrollLayout>
      </body>
    </html>
  );
}
