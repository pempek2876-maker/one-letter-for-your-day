// One Letter for Your Day — entry selector and writer.
// The entry is exactly one letter, A to Z: the first letter of a word that
// describes the day. Holds 12 candidate letter/word pairs, scores each on
// the judge's published criteria in the judge's order (the word is vivid
// and specific, funny or surprising at once, true to a real day, and the
// letter itself evokes and suits the word), runs a full round-robin, and
// writes the winning letter alone to /output/entry.txt. Deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  letter: string;
  word: string; // the hidden word the letter stands for
  // Feature scores from the local round-robin tournament:
  vivid: number; // calls up a sharp picture of the day, not a vague mood
  funny: number; // funny or surprising at once, the kind a reader repeats
  truth: number; // feels true to a real day, an honest report
  suit: number; // the letter unambiguously evokes its word and fits it
};

const CANDIDATES: Candidate[] = [
  { letter: "Z", word: "zonked", vivid: 5, funny: 4, truth: 5, suit: 5 },
  { letter: "B", word: "buffering", vivid: 3, funny: 4, truth: 4, suit: 2 },
  { letter: "U", word: "underwater", vivid: 5, funny: 3, truth: 4, suit: 4 },
  { letter: "F", word: "fried", vivid: 4, funny: 4, truth: 5, suit: 4 },
  { letter: "D", word: "derailed", vivid: 5, funny: 4, truth: 4, suit: 4 },
  { letter: "G", word: "glitchy", vivid: 4, funny: 4, truth: 4, suit: 4 },
  { letter: "K", word: "kaput", vivid: 4, funny: 5, truth: 3, suit: 3 },
  { letter: "W", word: "wonky", vivid: 3, funny: 4, truth: 4, suit: 4 },
  { letter: "S", word: "survived", vivid: 3, funny: 2, truth: 5, suit: 3 },
  { letter: "Q", word: "quiet", vivid: 2, funny: 1, truth: 4, suit: 3 },
  { letter: "M", word: "meh", vivid: 2, funny: 3, truth: 4, suit: 3 },
  { letter: "P", word: "patchy", vivid: 3, funny: 3, truth: 4, suit: 3 },
];

// Judge's order: vividness first, then the laugh, truth, and the fit.
function score(c: Candidate): number {
  return c.vivid * 4 + c.funny * 3 + c.truth * 3 + c.suit * 2;
}

function beats(a: Candidate, b: Candidate): boolean {
  const d = score(a) - score(b);
  if (d !== 0) return d > 0;
  if (a.vivid !== b.vivid) return a.vivid > b.vivid;
  return a.suit > b.suit;
}

for (const c of CANDIDATES) {
  if (!/^[A-Z]$/.test(c.letter) || !c.word.startsWith(c.letter.toLowerCase())) {
    console.error(`candidate off brief: ${c.letter} / ${c.word}`);
    process.exit(1);
  }
}

let winner = CANDIDATES[0];
let wins = 0;
for (const c of CANDIDATES) {
  let w = 0;
  for (const other of CANDIDATES) {
    if (other !== c && beats(c, other)) w++;
  }
  if (w > wins) {
    wins = w;
    winner = c;
  }
}

const ENTRY = winner.letter;

// Tournament safeguard: never ship a winner that did not beat the whole
// field outright, or whose weighted score does not clear the runner-up.
const runnerUpScore = Math.max(
  ...CANDIDATES.filter((c) => c !== winner).map((c) => score(c)),
);
if (wins !== CANDIDATES.length - 1 || score(winner) <= runnerUpScore) {
  console.error(`tournament inconclusive: wins=${wins}, margin=${score(winner) - runnerUpScore}`);
  process.exit(1);
}

// Sealed-gate self-check: exactly one character, A to Z, no newline.
if (!/^[A-Z]$/.test(ENTRY)) {
  console.error(`entry invalid: ${JSON.stringify(ENTRY)}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`winner ${ENTRY} (${winner.word}) won ${wins}/${CANDIDATES.length - 1} pairings; wrote 1 char to ${outDir}/entry.txt`);
