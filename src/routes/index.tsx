import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SHE, ME } from "@/lib/story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reauu, before you close this tab" },
      {
        name: "description",
        content: `An interactive little world ${ME} made for ${SHE} — choices, memories, and four different endings.`,
      },
      { property: "og:title", content: "Reauu, before you close this tab" },
      {
        property: "og:description",
        content: "Choices, memories, and four endings. Made for one person only.",
      },
    ],
  }),
  component: Opening,
});

function Opening() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <p className="rise-in text-xs tracking-[0.35em] text-muted-foreground uppercase">
        made only for you
      </p>
      <h1
        className="rise-in mt-6 max-w-3xl font-serif text-5xl leading-[1.05] text-foreground sm:text-7xl"
        style={{ animationDelay: "0.15s" }}
      >
        {SHE}, before you
        <span className="block text-primary italic">close this tab…</span>
      </h1>
      <p
        className="rise-in mt-7 max-w-md text-base leading-relaxed text-muted-foreground"
        style={{ animationDelay: "0.3s" }}
      >
        There are a few things I'm bad at saying out loud. So I built them into a story instead.
        You choose. It ends differently depending on who you are today.
      </p>

      <div
        className="rise-in mt-10 flex flex-col items-center gap-4 sm:flex-row"
        style={{ animationDelay: "0.45s" }}
      >
        <Link
          to="/story"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
        >
          <Heart className="h-4 w-4 transition-transform group-hover:scale-125" />
          Begin
        </Link>
        <Link
          to="/us"
          className="rounded-full border border-border px-8 py-3.5 text-sm text-foreground/90 transition-colors hover:bg-accent"
        >
          Just show me our photos
        </Link>
      </div>

      <p
        className="rise-in mt-16 font-serif text-sm text-muted-foreground italic"
        style={{ animationDelay: "0.6s" }}
      >
        — {ME}
      </p>
    </main>
  );
}
