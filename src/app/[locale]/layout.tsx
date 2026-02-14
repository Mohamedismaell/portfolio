import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ResponsiveNavbar from "@/components/navbar/ResponsiveNavbar";
import { Cairo, Inter } from "next/font/google";
import PageTransition from "@/components/animations/PageTransition";
// LoadingScreen is visually intrusive during dev (keeps showing on hot reload), maybe omit or use conditional
import CursorGlow from "@/components/animations/CursorGlow";
import type { Metadata } from "next";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: '--font-cairo' });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamedismael.dev"),
  title: {
    default: "Mohamed Ismael | Flutter Developer & Software Engineer",
    template: "%s | Mohamed Ismael",
  },
  description:
    "Mohamed Ismael is a Flutter Developer and Software Engineer متخصص في بناء تطبيقات Flutter احترافية باستخدام Clean Architecture و REST APIs و UI حديث.",
  keywords: [
    "Mohamed Ismael",
    "Flutter Developer",
    "Software Engineer",
    "Flutter Portfolio",
    "Flutter Developer Egypt",
    "Clean Architecture Flutter",
    "Mobile App Developer",
  ],
  authors: [{ name: "Mohamed Ismael" }],
  creator: "Mohamed Ismael",
  openGraph: {
    title: "Mohamed Ismael | Flutter Developer & Software Engineer",
    description:
      "Professional Flutter Developer specializing in scalable apps, Clean Architecture, and modern UI systems.",
    url: "https://mohamedismael.dev",
    siteName: "Mohamed Ismael Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Ismael Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Ismael | Flutter Developer",
    description:
      "Flutter Developer & Software Engineer building scalable mobile apps with Clean Architecture.",
    images: ["/og-image.png"],
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className={locale === "ar" ? cairo.className : inter.className}>
      <head>
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Ismael",
              url: "https://mohamedismael.dev",
              jobTitle: "Flutter Developer & Software Engineer",
              sameAs: [
                "https://github.com/Mohamedismaell",
                "https://www.linkedin.com/in/mohamed-ismail-dev"
              ],
              knowsAbout: [
                "Flutter",
                "Dart",
                "Clean Architecture",
                "REST APIs",
                "Mobile Development"
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#0B0F19] text-white overflow-x-hidden">
        <CursorGlow />
        <NextIntlClientProvider messages={messages}>
          <ResponsiveNavbar />
          <PageTransition>
            {children}
          </PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
