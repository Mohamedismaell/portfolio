import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ResponsiveNavbar from "@/components/navbar/Navbar";
import { Manrope } from "next/font/google";
import PageTransition from "@/components/animations/PageTransition";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mohamedismael.dev"
  ),
  title: {
    default: "Mohamed Ismail | Flutter Developer & Software Engineer",
    template: "%s | Mohamed Ismail",
  },
  description:
    "Mohamed Ismail is a Flutter Developer and Software Engineer specializing in scalable Flutter apps, clean architecture, and polished mobile experiences.",
  openGraph: {
    title: "Mohamed Ismail | Flutter Developer & Software Engineer",
    description:
      "Professional Flutter Developer specializing in scalable apps, Clean Architecture, and modern UI systems.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Mohamed Ismail Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Ismail Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Ismail | Flutter Developer",
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
    <html
      lang={locale}
      dir="ltr"
      className={manrope.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohamed Ismail",
              url: "https://mohamedismael.dev",
              jobTitle: "Flutter Developer & Software Engineer",
              sameAs: [
                "https://github.com/Mohamedismaell",
                "https://www.linkedin.com/in/mohamed-ismail-dev",
              ],
              knowsAbout: [
                "Flutter",
                "Dart",
                "Clean Architecture",
                "REST APIs",
                "Mobile Development",
              ],
            }),
          }}
        />
      </head>

      <body
        className="relative overflow-x-hidden font-sans theme-transition"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div
              className="absolute inset-0 theme-transition"
              style={{
                background: "var(--gradient-page-bg)",
              }}
            />

            <div
              className="absolute -left-24 -top-24 h-[460px] w-[460px] rounded-full opacity-70 blur-[72px] theme-transition dark:opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(237,207,170,0.20) 0%, rgba(237,207,170,0.06) 48%, transparent 74%)",
              }}
            />

            <div
              className="absolute right-[-80px] top-[80px] h-[360px] w-[360px] rounded-full opacity-55 blur-[76px] theme-transition dark:opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(237,207,170,0.14) 0%, rgba(237,207,170,0.04) 52%, transparent 76%)",
              }}
            />

            <div
              className="absolute left-[42%] top-[14%] hidden h-[320px] w-[320px] rounded-full opacity-0 blur-[90px] theme-transition dark:opacity-18 lg:block"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,157,87,0.18) 0%, rgba(239,157,87,0.06) 44%, transparent 74%)",
              }}
            />

            <div
              className="absolute bottom-[-120px] left-[12%] h-[300px] w-[300px] rounded-full opacity-0 blur-[100px] theme-transition dark:opacity-14"
              style={{
                background:
                  "radial-gradient(circle, rgba(247,190,132,0.14) 0%, rgba(247,190,132,0.04) 48%, transparent 76%)",
              }}
            />

            <div
              className="absolute bottom-[-80px] right-[10%] h-[260px] w-[260px] rounded-full opacity-0 blur-[90px] theme-transition dark:opacity-12"
              style={{
                background:
                  "radial-gradient(circle, rgba(239,157,87,0.16) 0%, rgba(239,157,87,0.05) 46%, transparent 78%)",
              }}
            />
          </div>

          <NextIntlClientProvider messages={messages}>
            <ResponsiveNavbar />

            <div className="relative z-0">
              <PageTransition>{children}</PageTransition>
            </div>
          </NextIntlClientProvider>

          <Toaster
            richColors
            position="bottom-right"
            toastOptions={{
              className: "theme-transition",
              style: {
                background: "var(--surface-solid)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}