import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { PhotoFrame } from "@/components/PhotoFrame";
import { useJourney } from "@/lib/journey";
import { resolveEnding, scenes, SHE, type Choice } from "@/lib/story";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our story — your choices | For Reauu" },
      {
        name: "description",
        content: "Five scenes, your answers, four possible endings. Choose honestly.",
      },
      { property: "og:title", content: "Our story — your choices" },
      { property: "og:description", content: "Five scenes. Four endings. Choose honestly." },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const navigate = useNavigate();
  const { picks, addPick, reset, hydrated } = useJourney();
  const [step, setStep] = useState(0);
  const [reply, setReply] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && picks.length > 0 && picks.length < scenes.length) {
      setStep(picks.length);
    }
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const scene = scenes[Math.min(step, scenes.length - 1)];

  function choose(choice: Choice) {
    addPick({ sceneId: scene.id, label: choice.label, tone: choice.tone, secret: choice.secret });
    setReply(choice.reply);
    window.setTimeout(() => {
      setReply(null);
      if (step + 1 >= scenes.length) {
        const all = [
          ...picks.filter((p) => p.sceneId !== scene.id),
          { tone: choice.tone, secret: choice.secret },
        ];
        const id = resolveEnding(all);
        void navigate({ to: "/ending/$id", params: { id } });
      } else {
        setStep((s) => s + 1);
      }
    }, 1600);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">
      <header className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> home
        </Link>
        <div className="flex items-center gap-2">
          {scenes.map((s, i) => (
            <span
              key={s.id}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === step ? "w-6 bg-primary" : i < step ? "w-3 bg-primary/50" : "w-3 bg-border")
              }
            />
          ))}
        </div>
        <button
          onClick={() => {
            reset();
            setStep(0);
          }}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" /> restart
        </button>
      </header>

      <section key={scene.id} className="rise-in flex flex-1 flex-col justify-center py-12">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">{scene.eyebrow}</p>
        <h1 className="mt-4 font-serif text-3xl leading-snug text-foreground sm:text-4xl">
          {scene.text}
        </h1>

        {scene.photoSlot ? (
          <PhotoFrame className="mt-8 w-44 self-start" tilt={-3} caption="us, once" />
        ) : null}

        <div className="mt-10 min-h-[13rem]">
          {reply ? (
            <p className="rise-in font-serif text-2xl text-primary italic">{reply}</p>
          ) : (
            <div className="flex flex-col gap-3">
              {scene.choices.map((choice) =>
                choice.runaway ? (
                  <RunawayChoice key={choice.label} choice={choice} onPick={choose} />
                ) : (
                  <ChoiceButton key={choice.label} choice={choice} onPick={choose} />
                ),
              )}
            </div>
          )}
        </div>
      </section>

      <footer className="pb-4 text-center text-xs text-muted-foreground">
        {SHE}, there are no wrong answers here.
      </footer>
    </main>
  );
}

function ChoiceButton({
  choice,
  onPick,
  style,
}: {
  choice: Choice;
  onPick: (c: Choice) => void;
  style?: React.CSSProperties;
}) {
  const [bursts, setBursts] = useState<number[]>([]);
  const idRef = useRef(0);

  return (
    <button
      style={style}
      onClick={(e) => {
        const id = idRef.current++;
        setBursts((b) => [...b, id]);
        window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 600);
        e.currentTarget.blur();
        onPick(choice);
      }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card/60 px-6 py-4 text-left text-base text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
    >
      <span className="relative z-10">{choice.label}</span>
      {bursts.map((b) => (
        <span
          key={b}
          className="heart-burst pointer-events-none absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-2xl text-primary"
        >
          ♥
        </span>
      ))}
    </button>
  );
}

function RunawayChoice({ choice, onPick }: { choice: Choice; onPick: (c: Choice) => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => {
          if (dodges >= 3) return;
          setDodges((d) => d + 1);
          setOffset({ x: (Math.random() - 0.5) * 220, y: (Math.random() - 0.5) * 60 });
        }}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <ChoiceButton
          choice={choice}
          onPick={onPick}
          style={{ width: "100%", display: "block" }}
        />
      </div>
      {dodges >= 3 ? (
        <p className="mt-2 text-xs text-muted-foreground">okay fine, you can pick it.</p>
      ) : null}
    </div>
  );
}
