import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "../../context/ThemeContext";
import Navigation from "../../components/Navigation";
import ErrorBoundary from "../../components/ErrorBoundary";
import Flyout from "../../components/Flyout";

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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ErrorBoundary>
              <Navigation />
              {children}
              <Flyout />
            </ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}