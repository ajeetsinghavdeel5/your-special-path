import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { PhotoFrame } from "@/components/PhotoFrame";
import { galleryPhotos, SHE } from "@/lib/story";

export const Route = createFileRoute("/us")({
  head: () => ({
    meta: [
      { title: "Our memories | For Reauu" },
      { name: "description", content: "A small gallery of us, with captions I'd never say aloud." },
      { property: "og:title", content: "Our memories" },
      { property: "og:description", content: "A small gallery of us, caption by caption." },
    ],
  }),
  component: MemoriesPage,
});

function MemoriesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> home
      </Link>

      <header className="mt-10 max-w-2xl">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">our memories</p>
        <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
          Proof that I pay <span className="text-primary italic">attention</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {SHE}, these are the ones I kept. Tap any of them to see it bigger.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {galleryPhotos.map((photo, i) => (
          <button key={photo.slot} onClick={() => setOpen(i)} className="text-left">
            <PhotoFrame caption={photo.caption} tilt={i % 2 === 0 ? -2 : 2} />
          </button>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          to="/story"
          className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5"
        >
          Okay, now read the story
        </Link>
      </div>

      {open !== null ? (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 px-6 backdrop-blur"
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <PhotoFrame caption={galleryPhotos[open].caption} />
          </div>
        </div>
      ) : null}
    </main>
  );
}
