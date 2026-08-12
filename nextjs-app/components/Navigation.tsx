"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "../navigation";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
  const t = useTranslations("nav");
  const { theme, toggleTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/">{t("home")}</Link>
        <Link href="/about">{t("about")}</Link>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => switchLocale(locale === "en" ? "uz" : "en")}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          {locale === "en" ? "UZ" : "EN"}
        </button>
        <button
          onClick={toggleTheme}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}