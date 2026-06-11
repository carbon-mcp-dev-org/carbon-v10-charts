# Deviations for Human Review — Job vrdg7m7s

## Purpose

This file records every case during this migration where the automated system was uncertain, made an assumption, or produced output that warrants human verification before the migration PR is merged. The migration did NOT stop for any of these — it continued with its best attempt and logged the entry here. A human reviewer should work through every entry below during draft-PR review, confirm the automated choice is acceptable, and mark each entry resolved.

- Total deviations: 3
- Design section: 1
- Architecture section: 2
- Generated: 2026-06-11T22:27:04Z
- Contributing agents: deviation-completeness-audit, front-end-developer

---

## Design

### Deviation 1

- Description: [carbon-pin-clamped] Deterministic guard set `@carbon/icons-react` 11.50.0 → ^11.50.0. Conformed @carbon/icons-react to the map §1.1.2 pinned range.
- File: `package.json`
- Lines:
- Agent: front-end-developer
- What the system did: partial-migration

## Architecture

### Deviation 2

- Description: [dependency-runtime-import-not-declared] Browser/runtime source imports packages not declared as runtime dependencies. Fix: Move imported runtime packages into dependencies, or replace the import with local browser-safe code. @types/* alone is not a runtime dependency declaration.
- File: `src/components/chart.tsx`
- Lines:
- Agent: front-end-developer
- What the system did: partial-migration

### Deviation 3

- Description: [stub-marker] Added ambient stub declarations for @carbon/icons-react in src/carbon-components.d.ts at line 24 without a matching deviation shard. The migration left a broad type shim that can mask real v11 icon typings and was called out in the migration map as stale shim residue.
- File: `src/carbon-components.d.ts`
- Lines: 24-25
- Agent: deviation-completeness-audit
- What the system did: other
