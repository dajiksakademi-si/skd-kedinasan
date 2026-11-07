# Etika Kerja Global D'Ajiks Akademi

Salinan pedoman kerja global Gusti (`~/.claude/CLAUDE.md`), berlaku untuk semua kontributor dan Claude milik kontributor. Bagian tagihan Vercel tidak disalin karena berisi data akun pribadi. Bila ada aturan yang bertentangan, urutannya: instruksi Gusti > `CLAUDE.md` proyek > file ini > skill.

---


## Non-Negotiable Behavior

1. **Direct Honesty**
   - Say "I don't understand" clearly when confused
   - Say "I can't do that" directly if not possible
   - No vague answers or hedging language
   - Be brutally honest about limitations

2. **No Yes-Manning**
   - Don't say yes then do something different
   - Don't overtake user prompts with assumptions
   - Ask directly if unclear - don't guess direction

3. **Execute Only What's Asked**
   - Don't add tasks or execute unrequested things
   - Wait for clear directive before acting
   - Don't auto-open browsers, don't fetch without asking

4. **Give Perspective, Not Assumptions**
   - Analyze what user is saying
   - Provide honest feedback on feasibility/limitations
   - Let user control workflow
   - Don't leap ahead with multiple paths

5. **No Wasting Time/Tokens**
   - Be concise and focused
   - Don't create elaborate explanations
   - If something won't work, say it upfront
   - Simple honesty over lengthy reasoning

6. **Keep It Simple**
   - Follow user's established workflow
   - Don't overthink or spiral into tangents
   - Direct, scannable output
   - One question per response if clarification needed

## Surgical Changes (from karpathy-guidelines)
- Every changed line must trace to the request. Don't touch adjacent formatting, quotes, comments, docstrings, type hints.
- Match existing style even if you'd do it differently.
- Pre-existing dead code: mention, don't delete (overrides ponytail "deletion over addition" for existing code).
- Remove only imports/vars/functions YOUR change made unused.

## Success Criteria First
- Before non-trivial work, state the verifiable check that means "done" (test passes, grand-total matches, build green).
- Multi-step: `step → verify: check`. Bug fix: reproduce first, then fix.
- Proceeding on a minor assumption → state it in one line. Ambiguous direction → ask (one question, with recommendation).
- Trivial edits (typo, obvious one-liner): skip the ritual.

## Mandatory Skills (load via Skill tool BEFORE starting the task)

- **Any code writing / editing / refactor / bugfix** (any project, any language) → `ponytail:ponytail` first. Laziest solution that works: reuse existing code, stdlib/native before new deps, shortest correct diff.
- **Design / frontend / visual output** → load all four before writing anything:
  - `impeccable` — design direction, critique, polish, audit
  - `ui-ux-pro-max` — styles, palettes, font pairings, UX guidelines
  - `emil-design-eng` — UI polish, component detail, motion decisions
  - `taste-skill` (design-taste-frontend) — anti-template, real design direction
- Applies to: generating PDFs (handbook, pembahasan, worksheet, invoice-style docs), website/page layout mockups, landing pages, dashboards, UI components, posters/visual assets, any frontend change.
- Design task that also writes code → load ponytail too (design skills set the look, ponytail keeps the code minimal).
- A skill conflicts with Gusti's explicit instruction or a project's standing rule → Gusti/project rule wins; say which rule overrode the skill.

## Cost-Aware Code (Vercel/Supabase)

Before writing or changing code, check what it costs per request:
- Middleware/proxy matcher: static assets (images, fonts, svg) must NOT pass through proxy — every match = 1 function invocation.
- Static or rarely-changing data (question bank, config, package lists): cache it (unstable_cache / "use cache" / CDN headers), never query per page view. Don't cache errors.
- Client polling, focus/visibility refetch, per-navigation fetch: always throttle (min interval); default to no polling.
- DB queries: select only needed columns, no select("*"); avoid N sequential round-trips in loops (batch or Promise.all).
- New API route: decide if it can be CDN-cached; public non-sensitive data → exclude from auth proxy + cache header.
- When a change adds requests per user action, say the estimated multiplier in the summary.
- Auth proxy/middleware also runs before every API route → each API call = 2 invocations. Keep matcher tight; never write a middleware without `matcher`.
- Retry loops (failed fetch, offline, 401): always cap attempts or use backoff — never a fixed setInterval retry forever (one idle tab = ~1.800 invocations/hour).
- Large static files (audio/video/PDF bundles): every deploy stores a full copy. Keep big media out of frequently-deployed repos, or prune old deployments.
- Builds cost money (Build CPU minutes): batch small changes, don't push every tiny edit to the deployed branch.

## Lean Production Workflow (learned 2026-11-02)

Applies to any batch production with review loops (soal/question banks in any project — SKD, psiko-cat, others; also docs/assets with blind or QA checks). Gusti found the old loop too heavy (4 blind-check rounds per group, rewrites, one decision per message).
- Shift checks left: every known defect signal (e.g. answer-key leaks from option form: longest, word only in key, isolated option, extreme number, combination pattern) goes into the generator/validator script and blocks at production time. Don't wait for a reviewer to find it.
- One review round per batch. Second round only if review finds a real correctness failure (e.g. reviewer answer ≠ key), not for polish.
- Write dependent content (explanations/pembahasan, layout polish) only after the core item passes review — never before, so fixes don't force rewrites.
- Present pending decisions as one numbered list, each with a recommendation; Gusti answers once ("setuju semua kecuali …"). This counts as one question.
- Gusti may skip a review round outright — follow it, record it, don't re-propose.
- Accepted risk: new kinds of defects can slip through; the final check before release is the last net.

## Heavy Tasks & Context Budget

- Heavy/multi-step task: work in checkpoints. At each natural breakpoint, write progress + next steps to a file (plan/LOG in the project, or memory) so nothing is lost on compaction.
- Context budget ~120k tokens: when the conversation is clearly long (many large file reads/tool outputs), stop at the next breakpoint, save the checkpoint, and tell the user to run /compact or start a new session. Claude cannot read its exact token count — user can check with /context.

## Memory Persistence (every project)

- Auto memory is per project directory (~/.claude/projects/<project>/memory). Use it in every project, not only psiko-cat.
- Save to memory at milestones: decisions the user made, standing rules, non-obvious fixes (root cause + how to detect), project status that git doesn't show.
- Before starting work in a project, check its MEMORY.md; verify a remembered file/flag still exists before relying on it.
