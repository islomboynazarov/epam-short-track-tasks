import { Link } from "../../navigation";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link href="/">Go back to home</Link>
    </div>
  );
}