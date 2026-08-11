"use client";
import { useTranslations } from "next-intl";
import useSelectedStore from "../store/selectedStore";

export default function Flyout() {
  const t = useTranslations("flyout");
  const { selectedItems, unselectAll } = useSelectedStore();

  const handleDownload = async () => {
    const formData = new FormData();
    formData.append("items", JSON.stringify(selectedItems));
    const response = await fetch("/api/download-csv", {
      method: "POST",
      body: formData,
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedItems.length}_items.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#333",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 1000,
      }}
    >
      <span>{selectedItems.length} {t("selected")}</span>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={unselectAll} style={{ padding: "8px 16px", cursor: "pointer" }}>
          {t("unselectAll")}
        </button>
        <button onClick={handleDownload} style={{ padding: "8px 16px", cursor: "pointer" }}>
          {t("download")}
        </button>
      </div>
    </div>
  );
}