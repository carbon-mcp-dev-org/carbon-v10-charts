# DEVIATIONS_FOR_REVIEW.md

**Purpose:** This document consolidates all deviations logged during the Carbon v10 → v11 migration for job `2wizp397`. It serves as the primary artifact for human review before merging the migration PR.

**Job ID:** 2wizp397  
**Generated:** 2026-06-08T22:07:32Z  
**Total Entries:** 0  
**Contributing Agents:** deviation-completeness-audit

---

## Summary

- **Design Deviations:** 0
- **Architecture Deviations:** 0

---

## Architecture Deviations

(none)

---

## Design Deviations

(none)

---

## Audit Notes

The completeness audit scanned all migration branches and found no uncertainty patterns (TODO, FIXME, HACK, approximation, wrapper, stub, placeholder markers, mixed-framework code, or Carbon-like-but-not-exact patterns). All changes are standard Carbon v10 → v11 API updates (property renames, CSS class prefix changes).

**Audit Session:** e9324fe4  
**Branches Scanned:** 14 (prep + 13 unit branches)  
**Missed Deviations Flagged:** 0



# Deviation Completeness Audit — Session e9324fe4

**Agent:** deviation-completeness-audit  
**Job ID:** 2wizp397  
**Generated:** 2026-06-08T22:07:01.804Z

## Audit Summary

This audit scanned all unit branches and the prep branch for uncertainty patterns per SPEC §5. No existing deviation shards were found across any branches in this job.

## Findings

No missed deviations detected. The changes in this migration are straightforward Carbon v10 → v11 API updates:

1. **Property name changes** (e.g., `placeHolderText` → `placeholder` in Search component) — standard API migration, not an uncertainty pattern.
2. **CSS class prefix updates** (e.g., `.bx--modal-content` → `.cds--modal-content`) — standard Carbon v11 naming convention, not an uncertainty pattern.

The word "placeholder" appears in the diff as a React prop value (`placeholder='Search charts'`), which is the correct v11 API usage, not a placeholder marker indicating incomplete work.

No TODO, FIXME, HACK, approximation, wrapper, stub, mixed-framework, or Carbon-like-but-not-exact patterns were detected in the migration changes.

## Entries

(none)
