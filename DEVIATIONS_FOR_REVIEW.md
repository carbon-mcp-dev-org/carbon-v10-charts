# Deviations for Review

**Purpose:** This document consolidates all deviations logged during the Carbon v11 migration for job `hrcl2pjb`. Each entry represents a decision point where the automated migration either could not proceed with full confidence or encountered a constraint requiring human review.

**Generated:** 2026-06-10T17:50:01Z

**Summary:**
- Total entries: 6
- Design section: 0
- Architecture section: 6

**Contributing agents:**
- dependency-install-failed
- front-end-developer
- deviation-completeness-audit

---

## Architecture

### 1. [toolchain-install-failed] (blocker)

- **Description:** A npm install failed after deterministic dependency normalization. The migrated project does NOT install cleanly — this MUST be resolved before the migration can be called done.
- **File:** (toolchain-level)
- **Agent:** dependency-install-failed
- **What the system did:** blocker

**Error tail:**
```
npm error peer react dependency conflict between @carbon/charts-react and react-hook-form
npm error Fix the upstream dependency conflict, or retry with --force or --legacy-peer-deps
```

---

### 2. [dependency-lockfile-drift]

- **Description:** package.json and npm lockfile root entries disagree. Fix: Regenerate the npm lockfile during migration validation. Prefer npm install --package-lock-only --ignore-scripts; delete package-lock.json only if it is unparseable.
- **File:** `package.json`
- **Agent:** front-end-developer
- **What the system did:** partial-migration

---

### 3. [dependency-old-carbon-artifacts]

- **Description:** Old Carbon dependency artifacts remain after a Carbon v11 target was declared. Fix: Remove Carbon v10-era direct packages and regenerate the selected lockfile from the migrated package.json.
- **File:** `package.json`
- **Agent:** front-end-developer
- **What the system did:** partial-migration

---

### 4. [dependency-strict-resolver-failed]

- **Description:** Strict package resolver failed. Fix: Resolve the peer dependency graph without --legacy-peer-deps. Align coupled toolchain packages such as react-scripts/jest/ts-jest/typescript, then regenerate the lockfile.
- **File:** `package.json`
- **Agent:** front-end-developer
- **What the system did:** partial-migration

---

### 5. [dependency-runtime-import-not-declared]

- **Description:** Browser/runtime source imports packages not declared as runtime dependencies. Fix: Move imported runtime packages into dependencies, or replace the import with local browser-safe code.
- **File:** `src/components/chart.tsx`
- **Agent:** front-end-developer
- **What the system did:** partial-migration

---

### 6. [dependency-browser-node-core-usage]

- **Description:** Browser-facing source or package entry imports Node core modules. Fix: Prefer replacing the offending package with browser-safe local code. If that is not possible, add an explicit bundler fallback/polyfill intention.
- **File:** `node_modules/lodash/lodash.js`
- **Agent:** front-end-developer
- **What the system did:** partial-migration

---

## Design

(No design deviations logged for this migration.)
