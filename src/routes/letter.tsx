import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ME, SHE } from "@/lib/story";

const LINES = [
  `${SHE},`,
  "No choices on this page. No jokes either.",
  "You matter to me. Not in the casual way people say it — in the way where my day is measurably worse when you're not in it.",
  "You matter when you're funny and when you're quiet. When you're proud of yourself and when you can't stand yourself.",
  "You don't have to earn this. You don't have to be easy, or impressive, or okay.",
  "I'm not going anywhere.",
  `— ${ME}`,
];

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "The letter | For Reauu" },
      { name: "description", content: "No choices, no jokes. Just the honest version." },
      { property: "og:title", content: "The letter" },
      { property: "og:description", content: "No choices, no jokes. Just the honest version." },
    ],
  }),
  component: LetterPage,
});

function LetterPage() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= LINES.length) return;
    const t = window.setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 500 : 1600);
    return () => window.clearTimeout(t);
  }, [visible]);

  const done = visible >= LINES.length;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-20">
      <div className="space-y-7">
        {LINES.slice(0, visible).map((line, i) => (
          <p
            key={i}
            className={
              "rise-in font-serif leading-relaxed " +
              (i === 0 || i === LINES.length - 1
                ? "text-2xl text-primary italic"
                : "text-xl text-foreground/90")
            }
          >
            {line}
          </p>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap gap-3">
        {!done ? (
          <button
            onClick={() => setVisible(LINES.length)}
            className="rounded-full border border-border px-7 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent"
          >
            Show it all
          </button>
        ) : (
          <>
            <Link
              to="/us"
              className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
            >
              Look at us again
            </Link>
            <Link
              to="/story"
              className="rounded-full border border-border px-7 py-3 text-sm text-foreground/90 transition-colors hover:bg-accent"
            >
              Replay the story
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
