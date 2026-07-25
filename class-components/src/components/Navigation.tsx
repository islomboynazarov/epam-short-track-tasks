import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px 20px", borderBottom: "1px solid #ccc" }}>
      <Link to="/?page=1">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navigation;