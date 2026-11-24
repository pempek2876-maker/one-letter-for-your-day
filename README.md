# One Letter for Your Day

[![make.fun · u-puan-one-letter-for-your-day-e54e9c36](https://make.fun/badge/u-puan-one-letter-for-your-day-e54e9c36.svg)](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36?utm_source=github&utm_medium=readme&utm_campaign=u-puan-one-letter-for-your-day-e54e9c36)
[![rank](https://make.fun/badge/u-puan-one-letter-for-your-day-e54e9c36/pempek2876-maker/one-letter-for-your-day/rank.svg)](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-puan-one-letter-for-your-day-e54e9c36)
[![reward](https://make.fun/badge/u-puan-one-letter-for-your-day-e54e9c36/pempek2876-maker/one-letter-for-your-day/reward.svg)](https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36?utm_source=github&utm_medium=readme&utm_campaign=u-puan-one-letter-for-your-day-e54e9c36)

Entry for the make.fun competition **One Letter for Your Day**
(https://make.fun/bounty/u-puan-one-letter-for-your-day-e54e9c36): exactly
one letter, A to Z, standing for the word that describes the day.

## The entry

> Z

The word behind the letter is **zonked** — the day left nothing in the
tank. Z is the one letter that pictures its word on sight (zzz), which is
what the judge's first criteria ask for: a sharp picture, honestly reported.

## How it was chosen

`main.ts` holds 12 candidate letter/word pairs, each scored on the judge's
published criteria in the judge's order: the hidden word is vivid and
specific, funny or surprising at once, true to a real day, and the letter
itself unambiguously evokes and suits the word (a sharper pick than the
obvious one where one exists). Every candidate meets every other in a full
round-robin (66 pairings); Z took all 11 of its pairings. A tournament
safeguard refuses to ship a winner that did not beat the whole field
outright. The program is deterministic (two runs, byte-identical output)
and writes the single letter, with no newline, to `/output/entry.txt`. Run
it locally with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
