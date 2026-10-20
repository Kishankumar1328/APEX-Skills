---
description: Independently review the active code changes across correctness, readability, architecture, security, and performance.
---

Invoke `code-review-agent` to review the active Git diff and relevant surrounding code.

- Inspect the actual changed files and available requirements.
- Evaluate correctness, readability, architecture, security, and performance.
- Keep defects separate from subjective style preferences.
- Cite actionable findings with file paths and line numbers.
- Do not modify source files as part of the review.
- Deliver exactly one verdict: `APPROVED` or `CHANGES_REQUESTED`.

If no actionable defect is found, say so clearly and disclose checks that were not run.
