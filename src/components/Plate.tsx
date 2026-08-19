import Image from "next/image";
import type { ImageRef } from "@/lib/types";

type Props = {
  image: ImageRef;
  height: number | string;
  width?: number | string;
  /** Shown instead of a graphic when there is no screenshot yet. */
  fallbackLabel?: string;
  fallbackTags?: string[];
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * The image wrapper — a warm archival grade inside a thin surface mat, so
 * photographs read as tipped-in book plates. Every content photograph goes
 * through this.
 *
 * Nine of fourteen projects have no screenshot yet, so the no-image case is a
 * typographic panel built from the same primitives — never a placeholder
 * graphic and never an emoji.
 */
export function Plate({
  image,
  height,
  width,
  fallbackLabel,
  fallbackTags,
  priority,
  sizes = "(max-width: 1023px) 100vw, 50vw",
  className,
}: Props) {
  const h = typeof height === "number" ? `${height}px` : height;
  const w = typeof width === "number" ? `${width}px` : width;

  if (!image) {
    return (
      <div
        className={className}
        style={{
          height: h,
          width: w,
          flex: w ? "none" : undefined,
          border: "1px solid var(--color-divider)",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        {fallbackLabel ? (
          <span
            className="display"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 26,
              lineHeight: 1.15,
              color: "var(--color-neutral-700)",
              maxWidth: "20ch",
            }}
          >
            {fallbackLabel}
          </span>
        ) : null}
        {fallbackTags?.length ? (
          <span className="kick" style={{ color: "var(--color-neutral-500)" }}>
            {fallbackTags.join(" · ")}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`plate ${className ?? ""}`}
      style={{ height: h, width: w, flex: w ? "none" : undefined }}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

/** A plate around an already-known remote thumbnail (YouTube stills). */
export function ThumbPlate({
  src,
  alt,
  height,
}: {
  src: string;
  alt: string;
  height: number;
}) {
  return (
    <div className="plate" style={{ height }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 50vw, 240px"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
