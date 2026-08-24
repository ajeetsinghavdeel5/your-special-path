import { useMemo } from "react";

const GLYPHS = ["♥", "✦", "♥", "❀", "✧"];

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        delay: (i * 1.7) % 18,
        duration: 22 + ((i * 5) % 16),
        size: 10 + ((i * 7) % 16),
        glyph: GLYPHS[i % GLYPHS.length],
        opacity: 0.12 + ((i * 3) % 5) / 20,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((item) => (
        <span
          key={item.id}
          className="animate-drift absolute bottom-[-10%] text-primary"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.glyph}
        </span>
      ))}
    </div>
  );
}
