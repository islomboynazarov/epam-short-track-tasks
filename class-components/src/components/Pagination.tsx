interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

function Pagination({ currentPage, onPageChange, hasNextPage }: PaginationProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "10px", padding: "20px" }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        Previous
      </button>
      <span style={{ padding: "8px 16px", fontSize: "16px" }}>
        Page {currentPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;