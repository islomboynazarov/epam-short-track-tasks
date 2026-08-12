import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <p>{t("author")}</p>
      <p>
        <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
          {t("link")}
        </a>
      </p>
    </div>
  );
}