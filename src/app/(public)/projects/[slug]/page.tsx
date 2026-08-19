import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Plate } from "@/components/Plate";
import { getProject, getProjectNeighbours, getProjects } from "@/lib/content";
import styles from "./detail.module.css";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { prev, next, index, total } = await getProjectNeighbours(slug);

  return (
    <article>
      <div className={styles.topbar}>
        <Link href="/projects" style={{ fontSize: 13 }}>
          ← All projects
        </Link>
        <span className="kick tnum">
          {String(index).padStart(2, "0")} / {total}
        </span>
      </div>

      <header className={styles.header}>
        <div>
          <div className="kick">{project.tags.join(" · ")}</div>
          <h1 className={`display ${styles.title}`}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
        </div>
        <div className={styles.facts}>
          {project.role ? (
            <div className={styles.factRow}>
              <span>Role</span>
              <span className={styles.factValue}>{project.role}</span>
            </div>
          ) : null}
          {project.year ? (
            <div className={styles.factRow}>
              <span>Year</span>
              <span className={`${styles.factValue} tnum`}>{project.year}</span>
            </div>
          ) : null}
          {project.stack ? (
            <div className={styles.factRow}>
              <span>Stack</span>
              <span className={styles.factValue}>{project.stack}</span>
            </div>
          ) : null}
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            {project.liveUrl ? (
              <a
                className="btn btn-primary"
                style={{ fontSize: 13 }}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live site
              </a>
            ) : null}
            {project.repoUrl ? (
              <a
                className="btn btn-secondary"
                style={{ fontSize: 13 }}
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Repository
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <div className={styles.hero}>
        <Plate
          image={project.shot ?? null}
          height={520}
          priority
          sizes="(max-width: 1023px) 100vw, 936px"
          fallbackLabel={project.title}
          fallbackTags={project.tags}
        />
      </div>

      <div className={styles.writeup}>
        <div className={`kick ${styles.writeupRail}`}>Write-up</div>
        <div className={styles.writeupBody}>
          <Part label="Problem" text={project.problem} />
          <Part label="Approach" text={project.approach} />
          <Part label="Outcome" text={project.outcome} last />
        </div>
      </div>

      <nav className={styles.prevnext} aria-label="Project navigation">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className={`rowlink ${styles.prev}`}>
            <span className="kick">← Previous</span>
            <span className={styles.neighbourTitle}>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className={`rowlink ${styles.next}`}>
            <span className="kick">Next →</span>
            <span className={styles.neighbourTitle}>{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}

function Part({
  label,
  text,
  last,
}: {
  label: string;
  text: string | null;
  last?: boolean;
}) {
  return (
    <>
      <h2 className={styles.sectionLabel}>{label}</h2>
      {text ? (
        <p className="lead" style={last ? { marginBottom: 0 } : undefined}>
          {text}
        </p>
      ) : (
        <p
          className="lead"
          style={{
            color: "var(--color-neutral-600)",
            fontStyle: "italic",
            marginBottom: last ? 0 : undefined,
          }}
        >
          Not written yet.
        </p>
      )}
      {last ? null : <div className="hr" />}
    </>
  );
}
