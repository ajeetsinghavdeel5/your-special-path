# "You Matter, Reauu" — an interactive story site

An interactive, multi-page website from Ajeet to Reauu: a choose-your-path story that mixes playful teasing, heartfelt memories, and a sincere "you matter to me" message, ending in one of 4 different endings.

## Pages

1. **Opening (`/`)** — Full-screen intro: "Reauu, before you close this tab..." with her name, a soft animated heart/starfield background, and one button to begin.
2. **The Story (`/story`)** — The heart of it. One question/scene at a time, each with 2-3 selectable options. Choices are remembered and shape which ending she reaches. Progress dots at the top, gentle fade/slide transitions between scenes, and a photo appearing with certain memory scenes.
3. **Our Memories (`/us`)** — A photo gallery of the two of you: a scrollable set of framed photos with a short caption under each ("the day you...", "this face right here"). Clicking a photo opens it larger.
4. **Ending (`/ending/$id`)** — One of 4 endings, each with its own artwork/photo, its own letter from Ajeet, and its own tone. A "replay" button to try different choices.
5. **The Letter (`/letter`)** — The unconditional page reachable from every ending: the plain, honest, no-jokes message about how much she matters. Line-by-line reveal so she reads it slowly.

## The 4 endings

Determined by the mix of choices she makes (playful vs. soft vs. honest):

- **"Still Yours"** — the warm, romantic one (most heartfelt choices)
- **"Certified Menace"** — the funny one, teasing her, ending in a sweet punchline (most playful choices)
- **"I'm Sorry"** — the making-up one, sincere apology and a promise (choices leaning to the hard/honest answers)
- **"Every Version of You"** — the secret ending, only reachable through a specific rare path, the most emotional of the four

## Interactive touches

- Choice buttons that lift and glow on hover, with a small heart burst on click
- A "no" button on one question that playfully runs away from her cursor
- Floating hearts/petals in the background, subtle and slow
- Music toggle in the corner (optional soft track she can mute)
- Choice history saved in the browser so she can resume where she left off

## Photos

I'll build every photo frame as a real, styled slot ready for your images — the gallery, the memory scenes, and the ending artwork. **You didn't attach any photos yet**, so I'll ship them with tasteful placeholders. Send me the photos in your next message (with a note on which is which if you want specific ones in specific spots) and I'll drop them straight in.

## Design direction

Warm night-sky palette: deep indigo/plum background, soft rose and cream accents, gold highlights for the special ending. Elegant serif for headings, clean sans for body text. Nothing corporate, nothing templated — it should feel like a handwritten letter that happens to be a website.

## Technical notes

- TanStack Start file routes: `index`, `story`, `us`, `ending.$id`, `letter`
- Story scenes/choices/endings live in a single typed data file so adding scenes later is trivial
- Choice state in React context + `localStorage`; ending resolved by scoring the choice tags
- All colors as semantic tokens in `src/styles.css`; no hardcoded color classes
- Per-route `head()` metadata; the site stays public with no backend needed
