export type Tone = "playful" | "soft" | "honest";

export type Choice = {
  label: string;
  tone: Tone;
  reply: string;
  /** marks the rare path toward the secret ending */
  secret?: boolean;
  /** playful button that runs away from the cursor */
  runaway?: boolean;
};

export type Scene = {
  id: string;
  eyebrow: string;
  text: string;
  photoSlot?: string;
  choices: Choice[];
};

export const SHE = "Reauu";
export const ME = "Ajeet";

export const scenes: Scene[] = [
  {
    id: "start",
    eyebrow: "scene one",
    text: `${SHE}. Be honest with me for a second — how are you actually doing today?`,
    choices: [
      {
        label: "Genuinely okay",
        tone: "soft",
        reply: "Good. I still want the rest of this to make your day better.",
      },
      {
        label: "Pretending I'm fine",
        tone: "honest",
        reply: "I thought so. You do that. I notice every single time.",
      },
      {
        label: "Why, what did you do",
        tone: "playful",
        reply: "Nothing! Suspicious of me already. Iconic behaviour.",
      },
    ],
  },
  {
    id: "memory",
    eyebrow: "scene two",
    text: "There's one memory of you I replay more than the others. Want to guess which one?",
    photoSlot: "memory-1",
    choices: [
      {
        label: "The day we couldn't stop laughing",
        tone: "playful",
        reply: "My face hurt for an hour. Worth it.",
      },
      {
        label: "The quiet night we just talked",
        tone: "soft",
        reply: "That one. Nothing happened and everything happened.",
      },
      {
        label: "The day I was a mess and you stayed",
        tone: "honest",
        reply: "You didn't need fixing. You needed company. I'd stay again.",
        secret: true,
      },
    ],
  },
  {
    id: "doubt",
    eyebrow: "scene three",
    text: "Sometimes you think you're too much, or not enough. Which lie is it today?",
    choices: [
      {
        label: "Too much",
        tone: "honest",
        reply: "You're not too much. Some people are just small containers.",
      },
      {
        label: "Not enough",
        tone: "soft",
        reply: "You've never once been not enough. Not for a second.",
      },
      {
        label: "Neither, I'm perfect",
        tone: "playful",
        reply: "Correct answer. Finally, someone agreeing with me.",
      },
    ],
  },
  {
    id: "matter",
    eyebrow: "scene four",
    text: "Quick test. Do you know how much you matter to me?",
    choices: [
      {
        label: "Yes",
        tone: "soft",
        reply: "Then let me say it louder anyway.",
      },
      {
        label: "No",
        tone: "honest",
        reply: "Then that's on me. I'm fixing it right now.",
        runaway: true,
      },
      {
        label: "Prove it",
        tone: "playful",
        reply: "Bold. Okay. Keep going.",
      },
    ],
  },
  {
    id: "us",
    eyebrow: "scene five",
    text: "If I could give you one thing tonight, what would you take?",
    photoSlot: "memory-2",
    choices: [
      {
        label: "A hug that lasts too long",
        tone: "soft",
        reply: "Saved. Redeemable any time, no expiry.",
      },
      {
        label: "You, being annoying at me",
        tone: "playful",
        reply: "That's free and unlimited, unfortunately for you.",
      },
      {
        label: "The truth, all of it",
        tone: "honest",
        reply: "Then here it is, on the next page.",
        secret: true,
      },
    ],
  },
];

export type EndingId = "still-yours" | "menace" | "sorry" | "every-version";

export type Ending = {
  id: EndingId;
  title: string;
  kicker: string;
  paragraphs: string[];
  signoff: string;
  secret?: boolean;
};

export const endings: Record<EndingId, Ending> = {
  "still-yours": {
    id: "still-yours",
    title: "Still Yours",
    kicker: "the warm one",
    paragraphs: [
      `${SHE}, you picked the soft answers, and that's exactly how you love — carefully, quietly, all the way through.`,
      "I don't need a special occasion to think about you. You show up in ordinary minutes: songs, streets, jokes I can't tell anyone else.",
      "Whatever else changes, this doesn't. I'm still yours.",
    ],
    signoff: `— ${ME}`,
  },
  menace: {
    id: "menace",
    title: "Certified Menace",
    kicker: "the funny one",
    paragraphs: [
      "Congratulations. You have officially been declared the most beautiful nuisance in my life.",
      "You argue with me about things that don't matter, steal the last bite, and send me forty messages in a row. And somehow that is my favourite part of the day.",
      "Here's the punchline: I built an entire website just to tell a menace that she matters. Do with that what you want.",
    ],
    signoff: `— your victim, ${ME}`,
  },
  sorry: {
    id: "sorry",
    title: "I'm Sorry",
    kicker: "the honest one",
    paragraphs: [
      "You answered honestly, so I will too.",
      "I haven't always made you feel chosen. Sometimes I was distracted, or short with you, or slow to say the thing you needed to hear. That's mine to own, not yours to explain away.",
      "I'm not asking you to forget it. I'm telling you I noticed, and I'm doing better — not in words, in how I show up.",
    ],
    signoff: `— sincerely, ${ME}`,
  },
  "every-version": {
    id: "every-version",
    title: "Every Version of You",
    kicker: "the ending you weren't supposed to find",
    paragraphs: [
      "You found the hidden one. Of course you did.",
      `I've seen you at your brightest and at your worst, ${SHE}. Tired, unsure, crying about something you called stupid. None of those versions made me want to leave.`,
      "People say they love someone at their best. I'd rather say this: I want every version of you, including the ones you're embarrassed by. Especially those.",
      "You matter. Not because of what you do for me. Because you're you, and that has always been enough.",
    ],
    signoff: `— always, ${ME}`,
    secret: true,
  },
};

export function resolveEnding(picks: { tone: Tone; secret?: boolean }[]): EndingId {
  const secrets = picks.filter((p) => p.secret).length;
  if (secrets >= 2) return "every-version";
  const count = { playful: 0, soft: 0, honest: 0 };
  picks.forEach((p) => (count[p.tone] += 1));
  if (count.honest >= count.playful && count.honest >= count.soft) return "sorry";
  if (count.playful > count.soft) return "menace";
  return "still-yours";
}

export const galleryPhotos = [
  { slot: "us-1", caption: "the day you laughed so hard you cried" },
  { slot: "us-2", caption: "this face right here. my whole thing." },
  { slot: "us-3", caption: "nothing special happening, best day anyway" },
  { slot: "us-4", caption: "you, mid-sentence, telling me a story" },
  { slot: "us-5", caption: "the one you said I wasn't allowed to keep" },
  { slot: "us-6", caption: "us. that's the caption." },
];
