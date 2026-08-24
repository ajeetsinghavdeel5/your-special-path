import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { PhotoFrame } from "@/components/PhotoFrame";
import { useJourney } from "@/lib/journey";
import { endings, SHE, type EndingId } from "@/lib/story";

export const Route = createFileRoute("/ending/$id")({
  loader: ({ params }) => {
    const ending = endings[params.id as EndingId];
    if (!ending) throw notFound();
    return { ending };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { ending } = loaderData;
    return {
      meta: [
        { title: `${ending.title} — an ending | For Reauu` },
        { name: "description", content: ending.paragraphs[0] },
        { property: "og:title", content: `${ending.title} — an ending` },
        { property: "og:description", content: ending.paragraphs[0] },
      ],
    };
  },
  component: EndingPage,
});

function EndingPage() {
  const { ending } = Route.useLoaderData();
  const { reset } = useJourney();
  const gold = ending.secret;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <p
        className={
          "rise-in text-xs tracking-[0.3em] uppercase " +
          (gold ? "text-gold" : "text-muted-foreground")
        }
      >
        {ending.kicker}
      </p>
      <h1
        className={
          "rise-in mt-4 font-serif text-5xl leading-tight sm:text-6xl " +
          (gold ? "text-gold" : "text-primary")
        }
        style={{ animationDelay: "0.1s" }}
      >
        {ending.title}
      </h1>

      <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-start">
        <PhotoFrame className="w-40 shrink-0" tilt={gold ? 2 : -3} caption={SHE} />
        <div className="space-y-5">
          {ending.paragraphs.map((p, i) => (
            <p
              key={i}
              className="rise-in text-base leading-relaxed text-foreground/90"
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {p}
            </p>
          ))}
          <p className="font-serif text-lg text-muted-foreground italic">{ending.signoff}</p>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <Link
          to="/letter"
          className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
        >
          One more thing, no jokes
        </Link>
        <Link
          to="/story"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm text-foreground/90 transition-colors hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" /> Try different choices
        </Link>
        <Link
          to="/us"
          className="rounded-full border border-border px-7 py-3 text-sm text-foreground/90 transition-colors hover:bg-accent"
        >
          Our photos
        </Link>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        There are four endings. One of them is hidden.
      </p>
    </main>
  );
}
