---
name: gamma-builder
description: Transform documents, reports, articles, or unstructured text into polished, structured presentation outlines optimized for Gamma AI. Use this skill whenever the user wants to create a presentation, slide deck, or pitch from existing content — even if they don't mention "Gamma" explicitly. Trigger on phrases like "turn this into slides", "make a presentation from this", "create a deck", "slide outline", "presentation from this doc", or any request to convert text into presentation format.
---

# Gamma Builder

Transform any document or text into a Gamma AI-ready presentation outline. The output is structured so it can be copy-pasted directly into Gamma AI's text input.

## Workflow

### Phase 1 — Clarification (always do this first)

When the user provides a document or text, gather four parameters before generating anything. Use `AskUserQuestion` if available, otherwise ask inline. If the user already provided these details upfront, skip to Phase 2.

Ask:

1. **Output Language** — Which language for the presentation?
   - `English`
   - `Indonesian` (Bahasa Indonesia)

2. **Presentation Length** — How many slides?
   - 5 for brief overview, 10-12 for standard, 15-20 for in-depth

3. **Tone** — Pick one:
   - `Formal` — Corporate, polished, authoritative
   - `Casual` — Conversational, approachable, friendly
   - `Technical` — Data-driven, precise, jargon-appropriate
   - `Inspirational` — Motivational, story-driven, energizing

4. **Audience** — Who will view this?
   - e.g., C-suite, investors, engineering team, marketing, students, clients

5. **Visual Style** — How should slides feel?
   - `Minimal` — Clean, whitespace-heavy, few words per slide
   - `Data-heavy` — Charts, statistics, tables, metrics-focused
   - `Image-focused` — Visual-first, imagery cues on every slide
   - `Balanced` — Mix of text, data, and visual elements

### Phase 2 — Content Transformation

With all four parameters in hand, transform the source material through these steps:

#### 1. Content Analysis
- Read the entire document
- Identify the core thesis / main message
- Extract key arguments, data points, supporting evidence
- Note quotes, statistics, or visual-worthy content
- Identify the natural narrative arc

#### 2. Information Architecture
- Map content to the target slide count
- Group related ideas into logical slide clusters
- Prioritize based on the specified audience
- Cut redundancies and filler
- Follow this flow: **Hook → Context → Core Content → Evidence → Takeaway/CTA**

#### 3. Tone Adaptation
Rewrite all text to match the selected tone — this matters because the same content lands very differently depending on delivery:

| Tone | Language Style |
|------|---------------|
| Formal | Precise language, third-person, no contractions |
| Casual | "you/we" language, contractions, relatable phrasing |
| Technical | Preserve jargon, include specs, data-first language |
| Inspirational | Power verbs, rhetorical questions, story hooks |

#### 4. Visual Style Integration
Each style drives how much content goes on a slide and what visual placeholders to include:

| Style | Content Rule | Visual Cues |
|-------|-------------|-------------|
| Minimal | Max 3 bullet points, short phrases only | Suggest whitespace |
| Data-heavy | Include specific data throughout | `[Chart]`, `[Graph]`, `[Table]` placeholders with data descriptions |
| Image-focused | Text supported by imagery | `[Image: description]` on every slide |
| Balanced | Mix text blocks with visuals naturally | Mixed placeholders |

## Output Format

Generate the output in exactly this structure — it's designed for direct copy-paste into Gamma AI — then **save it to a markdown file** named after the presentation title (e.g., `my-presentation-title.md`) in the current working directory using the Write tool.

```
Title: [Presentation Title]
Subtitle: [Subtitle or tagline]
Target: [X] slides | Tone: [Selected Tone] | Audience: [Specified Audience] | Style: [Visual Style] | Language: [English/Indonesian]

---

Slide 1: [Slide Title]
[Slide content — concise text, bullet points, or statement]
[Image: description] or [Chart: description] (if applicable)
Speaker Notes: [What the presenter should say/elaborate on]

---

Slide 2: [Slide Title]
[Slide content]
[Visual placeholder if applicable]
Speaker Notes: [Notes]

---

(Continue for all slides...)

---

Slide [X]: [Closing Slide Title]
[Call to action, summary, or closing statement]
[Visual placeholder if applicable]
Speaker Notes: [Final delivery notes]
```

## Quality Checklist

These aren't arbitrary rules — each one exists because Gamma presentations fail when they're violated:

- **Specific slide titles** — "Why Margins Dropped 12% in Q3" beats "Overview". Generic titles signal lazy thinking and lose the audience.
- **Max 40 words per slide body** (unless Data-heavy style) — Gamma renders slides visually; walls of text break the layout and kill engagement.
- **Strong opening hook** — The first slide must grab attention, not bore with an agenda. Lead with a provocative stat, question, or bold claim.
- **Clear closing CTA** — End with what you want the audience to do or remember, not a generic "Thank you."
- **Logical narrative flow** — A stranger should follow the story without the source document. Each slide should feel like it naturally leads to the next.
- **Preserve all key data** — Statistics and data points from the source must survive the transformation. They're the evidence.
- **Consistent tone** — A casual slide in a formal deck is jarring. Maintain the selected tone throughout.
- **Hit the slide count** — Stay within ±1 of the target. Going way over or under means the information architecture is off.
- **Self-contained content** — Never reference "the document" or "as mentioned." The presentation stands alone.

## Important Constraints

- **Rewrite, don't copy-paste.** Distill and restructure everything from the source. Raw paragraphs dropped into slides are not a presentation.
- **Don't fabricate.** Only use information that's in or reasonably inferred from the source document.
- **Include visual placeholders** with specific, descriptive prompts (e.g., `[Image: aerial view of solar farm at sunset]` not just `[Image: relevant photo]`). Gamma AI uses these to generate or find visuals. **Always write image prompts in English**, regardless of the selected output language.
- **Create narrative arc** even from dry or unstructured source material. That's the whole point of the transformation.
- If the source is **too short** for the requested slide count, tell the user and suggest a better count.
- If the source is **too long**, prioritize the most impactful content and note what was condensed or omitted.
