import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "#fafafa",
          color: "#111",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 800,
              margin: "0 0 0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            404
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#666",
              margin: "0 0 2rem",
            }}
          >
            This page doesn&apos;t exist.
          </p>
          <Link
            href="/en/"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            Go to NadoTools
          </Link>
        </div>
      </body>
    </html>
  );
}
