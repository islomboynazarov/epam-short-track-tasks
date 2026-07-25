import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/?page=1">Go back to home</Link>
    </div>
  );
}

export default NotFoundPage;