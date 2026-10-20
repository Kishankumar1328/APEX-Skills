---
description: Consolidate verified test evidence, defects, blockers, and residual risks into a QA summary without granting release approval.
---

Invoke `complete-qa-agent` from `testing-skill`.

1. Inspect actual available test, scan, review, and defect evidence.
2. Reconcile results using: `PASSED`, `FAILED`, `BLOCKED`, `SKIPPED`, `NOT_RUN`, `FLAKY`, and `INCONCLUSIVE`.
3. Separate confirmed defects from test or environment issues.
4. Report executed commands, available counts, coverage gaps, blockers, and residual risks.
5. State the recommended next action.

Do not fabricate evidence and do not grant formal UAT or production-release approval.
