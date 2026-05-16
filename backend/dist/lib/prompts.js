"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIGNAL_EXTRACTION_PROMPT = void 0;
const SIGNAL_EXTRACTION_PROMPT = (summary) => `
You are an expert relationship analyst. Analyse the following mentor-startup interaction
summary and extract 7 relationship intelligence signals.

Interaction summary:
"${summary}"

Signal definitions:
- clarity (1–10): How much shared understanding was established. 10 = fully clear.
- uncertainty (1–10): How much uncertainty or open questions remain. 10 = highly uncertain.
- engagement (1–10): How actively engaged both parties were. 10 = highly engaged.
- friction_level (1–10): Level of resistance or difficulty in the interaction. 10 = very high friction.
- expectation_mismatch (1–10): Degree of misaligned expectations. 10 = severe mismatch.
- alignment_speed (1–10): How quickly parties aligned on priorities. 10 = instant alignment.
- ambiguity_tolerance (1–10): Comfort level with unclear situations. 10 = high tolerance.

Respond ONLY with a JSON object. No markdown. No explanation. No commentary. No code fences.

{
  "clarity": <integer 1-10>,
  "uncertainty": <integer 1-10>,
  "engagement": <integer 1-10>,
  "friction_level": <integer 1-10>,
  "expectation_mismatch": <integer 1-10>,
  "alignment_speed": <integer 1-10>,
  "ambiguity_tolerance": <integer 1-10>
}
`;
exports.SIGNAL_EXTRACTION_PROMPT = SIGNAL_EXTRACTION_PROMPT;
