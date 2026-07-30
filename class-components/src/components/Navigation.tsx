// import { Link } from "react-router-dom";

// function Navigation() {
//   return (
//     <nav style={{ display: "flex", gap: "20px", padding: "10px 20px", borderBottom: "1px solid #ccc" }}>
//       <Link to="/?page=1">Home</Link>
//       <Link to="/about">About</Link>
//     </nav>
//   );
// }

// export default Navigation;

import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navigation() {
  const { theme, toggleTheme } = useTheme();

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
        <Link to="/?page=1">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <button onClick={toggleTheme} style={{ padding: "8px 16px", cursor: "pointer" }}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}

export default Navigation;