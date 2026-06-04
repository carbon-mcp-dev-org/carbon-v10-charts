# Deviations for Review — Job pmp6g0j8

**Generated:** 2026-06-04T22:36:54Z  
**Contributing agents:** front-end-developer, deviation-completeness-audit

---

## Purpose

This document consolidates all deviations logged during the Carbon v9 → v11 migration for job `pmp6g0j8`. Each entry represents a decision point where the automated migration either:
- Could not achieve full fidelity to Carbon v11 patterns
- Made a trade-off that requires human review
- Flagged incomplete or placeholder functionality

Review these entries before merging to ensure the migration meets your quality standards.

---

## Summary

- **Total entries:** 3
- **Architecture section:** 3
- **Design section:** 0

---

## Architecture

### 1. Runtime import not declared as dependency

**File:** `src/components/chart.tsx`  
**Agent:** front-end-developer  
**What the system did:** partial-migration

**Description:** [dependency-runtime-import-not-declared] Browser/runtime source imports packages not declared as runtime dependencies. Fix: Move imported runtime packages into dependencies, or replace the import with local browser-safe code. @types/* alone is not a valid runtime dependency.

---

### 2. Browser code imports Node core modules

**File:** `node_modules/lodash/lodash.js`  
**Agent:** front-end-developer  
**What the system did:** partial-migration

**Description:** [dependency-browser-node-core-usage] Browser-facing source or package entry imports Node core modules. Fix: Prefer replacing the offending package with browser-safe local code. If that is not possible, add an explicit bundler fallback/polyfill intention.

---

### 3. Placeholder styling for unimplemented UI sections

**File:** `src/routes/add-data.tsx`  
**Lines:** 18-21  
**Agent:** deviation-completeness-audit  
**What the system did:** other

**Description:** Placeholder CSS styling detected in migrated code. The `placeholder` constant defines a gray background box (height: 100px; background: #f3f3f3) used as a visual placeholder for unimplemented UI sections ("uploader", "mapping of cols/rows to fields", "how to use endpoint", "declaration of availiable fields"). This represents incomplete functionality that was migrated without full implementation.

**Pattern Category:** placeholder  
**Original Change Location:** src/routes/add-data.tsx, lines 18-21 (new code added in migration)  
**Branch:** mig/pmp6g0j8 (prep branch)

---

## Design

_No design-specific deviations logged._
