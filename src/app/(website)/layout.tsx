import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "رکام - نگاه نو، اقتصاد نو",
  description:
    "رکام طرح بین‌المللی خرید و فروش بدون وجه نقد را در کنار شما ایجاد کردیم که در قالب ۱۲ فاز، اجرایی خواهد شد.",
  keywords: "رکام, اقتصاد نو, خرید و فروش بدون وجه نقد, بازرگانی, آموزش",
  authors: [{ name: "رکام" }],
  creator: "رکام",
  publisher: "رکام",
  robots: "index, follow",
  openGraph: {
    title: "رکام - نگاه نو، اقتصاد نو",
    description:
      "رکام طرح بین‌المللی خرید و فروش بدون وجه نقد را در کنار شما ایجاد کردیم",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
