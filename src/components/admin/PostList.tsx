"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { AdminPost } from "@/lib/admin-content";
import { useToast } from "./Toast";
import styles from "./admin.module.css";

export function PostList({
  posts,
  writable,
}: {
  posts: AdminPost[];
  writable: boolean;
}) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  async function create() {
    setBusy(true);
    const response = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Untitled", kind: "Note", summary: "" }),
    });
    const body = (await response.json().catch(() => null)) as
      | { id?: string; error?: string }
      | null;
    setBusy(false);

    if (!response.ok || !body?.id) {
      toast(body?.error ?? "Could not create the post.", "error");
      return;
    }
    router.push(`/admin/writing/${encodeURIComponent(body.id)}`);
  }

  return (
    <>
      <div className={styles.tableHead}>
        <div className="kick">All posts</div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={create}
          disabled={busy || !writable}
          title={writable ? undefined : "Studio is read-only"}
        >
          New post
        </button>
      </div>

      {posts.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Kind</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>
                  <Link href={`/admin/writing/${encodeURIComponent(post._id)}`}>
                    {post.title || "Untitled"}
                  </Link>
                </td>
                <td style={{ color: "var(--color-neutral-700)" }}>{post.kind}</td>
                <td>
                  <span className={`tag ${post._draft ? "tag-neutral" : "tag-outline"}`}>
                    {post._draft ? "Draft" : "Published"}
                  </span>
                </td>
                <td className="tnum" style={{ textAlign: "right", color: "var(--color-meta)" }}>
                  {post.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyRail}>
          No posts yet. The public nav link stays hidden until the first one
          publishes.
        </div>
      )}
    </>
  );
}
