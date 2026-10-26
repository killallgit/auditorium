# Issue tracker: Beads (bd)

Issues for this repo live in the local Beads database under `.beads/` (Dolt).
Cross-machine sync is `bd dolt push` / `bd dolt pull`. `.beads/issues.jsonl` is a
passive export — never the source of truth, and never `bd import` it during
normal operation. Run `bd prime` for the full workflow context.

**PRs as a request surface:** off. (Flip to on only if external PRs should enter
the triage queue.)

## Conventions

- One bead per ticket. Create with:
  `bd create "<title>" -d "<body>" -l <labels>`
  (use `--body-file -` for long markdown bodies via stdin).
- Triage state is a **label**, not a status (see `triage-labels.md`).
  Apply/remove with `bd label add <id> <label>` / `bd label remove <id> <label>`.
- Blocking edges are real dependencies:
  `bd create "..." --deps blocked-by:<id>` or `bd dep add <blocked> <blocker>`.
  Inspect with `bd dep list <id>` / `bd graph`.
- Hierarchy via `--parent <id>`; list children with `bd children <id>`.
- Comments: `bd comment <id> "<text>"`. Running notes: `bd note <id> "<text>"`.
- Claim work atomically: `bd update <id> --claim`; complete with `bd close <id>`.
- `bd ready` is the "what's available (open, unblocked, unclaimed)" query.
- Find issues by label: `bd list -l <label>`; all labels in use: `bd label list-all`.

## When a skill says "publish to the issue tracker"

Create bead(s) with `bd create`, one per ticket in dependency order (blockers
first) so later tickets can reference real IDs in `--deps`. Apply the
`ready-for-agent` label unless told otherwise. If the source was an existing
bead, create each ticket with `--parent <source-id>`.

## When a skill says "fetch the relevant ticket"

`bd show <id>` (add `--json` for machine-readable fields). If the reference is
ambiguous, `bd search "<text>"` and ask.

## When a skill says "close the ticket the way the tracker closes work"

`bd close <id>` with a short reason. Beads has no PR-based closing; if a PR is
opened anyway, mention the bead ID in its body.

## Wayfinding operations

Used by `/wayfinder`.

- **Map**: a bead labelled `wayfinder:map`:
  `bd create "<effort> — map" --body-file - -l wayfinder:map`
  Its body holds Notes / Decisions-so-far / Fog. Append decisions with `bd note`.
- **Child ticket**: `bd create "<question>" -d "..." --parent <map-id> -l wayfinder:ticket`
  with a `Type:` line (`research`/`prototype`/`grilling`/`task`) in the body.
- **Blocking**: `bd dep add <ticket> <blocker>`. A ticket is unblocked when every
  bead it depends on is closed.
- **Frontier**: `bd children <map-id>` intersected with `bd ready`; oldest first.
- **Claim**: `bd update <id> --claim` before any work.
- **Resolve**: `bd comment <id>` with the answer under an `## Answer` heading,
  `bd close <id>`, then `bd note <map-id>` with a gist + bead ID pointer.
