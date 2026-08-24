import { Music, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Soft ambient tone generated in-browser (no audio file needed).
 * Muted by default; she can turn it on.
 */
export function MusicToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(null);

  useEffect(() => {
    return () => {
      nodesRef.current?.oscs.forEach((o) => o.stop());
      void ctxRef.current?.close();
    };
  }, []);

  function toggle() {
    if (on) {
      nodesRef.current?.oscs.forEach((o) => o.stop());
      nodesRef.current = null;
      void ctxRef.current?.close();
      ctxRef.current = null;
      setOn(false);
      return;
    }
    const AudioCtor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtor();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    const oscs = [220, 277.18, 329.63].map((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.3 - i * 0.08;
      osc.connect(g).connect(gain);
      osc.start();
      return osc;
    });
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);
    ctxRef.current = ctx;
    nodesRef.current = { gain, oscs };
    setOn(true);
  }

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Turn music off" : "Turn music on"}
      className="fixed right-4 bottom-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-primary"
    >
      {on ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
