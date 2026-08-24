import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Tone } from "./story";

export type Pick = { sceneId: string; label: string; tone: Tone; secret?: boolean };

type JourneyValue = {
  picks: Pick[];
  addPick: (pick: Pick) => void;
  reset: () => void;
  hydrated: boolean;
};

const KEY = "reauu-journey-v1";
const JourneyContext = createContext<JourneyValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [picks, setPicks] = useState<Pick[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setPicks(JSON.parse(raw) as Pick[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(picks));
    } catch {
      /* ignore */
    }
  }, [picks, hydrated]);

  const addPick = useCallback((pick: Pick) => {
    setPicks((prev) => [...prev.filter((p) => p.sceneId !== pick.sceneId), pick]);
  }, []);

  const reset = useCallback(() => setPicks([]), []);

  return (
    <JourneyContext.Provider value={{ picks, addPick, reset, hydrated }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}
