import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../src/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://refmev1.vercel.app"),
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://refmev1.vercel.app",
  },
  title: "RefMe_ | Technical Reference for Modern Developers",
  description:
    "The ultimate centralized, fast, and minimal technical reference hub for modern full-stack development. Built for clarity and speed.",
  keywords: [
    "developer tools",
    "cheatsheet",
    "full-stack",
    "reference",
    "Next.js",
    "programming",
  ],
  authors: [
    {
      name: "Yash Vardhan",
      url: "https://www.linkedin.com/in/vardhan-yash3105/",
    },
  ],
  openGraph: {
    title: "RefMe_ | Technical Reference",
    description:
      "The ultimate technical reference for modern full-stack development.",
    url: "https://refmev1.vercel.app",
    siteName: "RefMe",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RefMe_ | Technical Reference for Modern Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RefMe_ | Technical Reference",
    description:
      "The ultimate technical reference for modern full-stack development.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "RefMe_ | Technical Reference for Modern Developers",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RefMe",
    url: "https://refmev1.vercel.app",
    description:
      "The ultimate centralized, fast, and minimal technical reference hub for modern full-stack development. Built for clarity and speed.",
  };

  return (
    <html lang='en' className='h-full antialiased' suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('refme-theme');
                  const dark = stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
                  if (dark) {
                    document.documentElement.classList.add('dark');
                    document.body.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body 
        suppressHydrationWarning 
        className='min-h-full flex flex-col bg-zinc-50 text-zinc-950 dark:bg-[#050505] dark:text-zinc-100 font-sans tracking-tight'
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}