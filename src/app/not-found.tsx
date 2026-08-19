import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        padding: "64px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
          margin: "0 auto",
          maxWidth: 560,
          flexWrap: "wrap",
        }}
      >
        <span
          className="tnum"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 56,
            color: "var(--color-neutral-300)",
          }}
        >
          404
        </span>
        <div>
          <h1
            className="display"
            style={{ fontFamily: "var(--font-heading)", fontSize: 24, margin: 0 }}
          >
            That page is not filed here
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "var(--color-neutral-700)",
              margin: "4px 0 8px",
            }}
          >
            The link may be old, or the project may have been unpublished.
          </p>
          <Link href="/" style={{ fontSize: 13.5 }}>
            Back to the index →
          </Link>
        </div>
      </div>
    </div>
  );
}
