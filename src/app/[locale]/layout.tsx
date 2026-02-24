import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ResponsiveNavbar from "@/components/navbar/Navbar";
import { Inter } from "next/font/google";
import PageTransition from "@/components/animations/PageTransition";
import CursorGlow from "@/components/animations/CursorGlow";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
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
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Mohamed Ismael Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mohamed Ismael Portfolio" }],
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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" className={inter.className}>
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
                "https://www.linkedin.com/in/mohamed-ismail-dev",
              ],
              knowsAbout: ["Flutter", "Dart", "Clean Architecture", "REST APIs", "Mobile Development"],
            }),
          }}
        />
      </head>

      <body className="text-white overflow-x-hidden relative">

        {/* ── Global cinematic background ── */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

          <div className="absolute inset-0" style={{ background: "#0d0d0d" }} />

          <div
            className="absolute -top-40 -left-40 w-[900px] h-[900px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(200,200,220,0.04) 40%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />

          <div
            className="absolute bottom-[-200px] right-[-200px] w-[900px] h-[900px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(180,180,200,0.03) 50%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />

          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.02) 55%, transparent 80%)",
            }}
          />
        </div>

        {/*  Provider wraps BOTH navbar and page content */}
        <NextIntlClientProvider messages={messages}>

          {/* Navbar inside provider — useRouter() now has intl context */}
          <ResponsiveNavbar />

          {/* Page content */}
          <div className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </div>

        </NextIntlClientProvider>

        {/* Outside provider — these don't need intl */}
        <CursorGlow />
        <Toaster richColors position="bottom-right" />
        <SpeedInsights />

      </body>
    </html>
  );
}
