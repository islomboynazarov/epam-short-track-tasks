import useSelectedStore from "../store/selectedStore";

function Flyout() {
  const { selectedItems, unselectAll } = useSelectedStore();

  const handleDownload = () => {
    const headers = ["name", "description", "url"];
    const rows = selectedItems.map((p) => [
      p.name,
      p.description,
      `https://pokeapi.co/api/v2/pokemon/${p.id}`,
    ]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
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
      <span>{selectedItems.length} item(s) selected</span>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={unselectAll}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default Flyout;