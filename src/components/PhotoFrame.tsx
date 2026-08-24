import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Photo slot. Drop a real image in by passing `src`.
 * Until then it renders a styled placeholder frame.
 */
export function PhotoFrame({
  src,
  alt,
  caption,
  className,
  tilt = 0,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
  tilt?: number;
}) {
  return (
    <figure
      className={cn(
        "group rounded-sm bg-card p-3 pb-5 shadow-[var(--shadow-frame)] ring-1 ring-border transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]",
        className,
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-xs bg-muted">
        {src ? (
          <img
            src={src}
            alt={alt ?? caption ?? "Our photo"}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[image:var(--gradient-frame)] text-muted-foreground">
            <ImageIcon className="h-6 w-6 opacity-60" aria-hidden />
            <span className="px-4 text-center text-xs tracking-wide">a photo of us goes here</span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center font-serif text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
