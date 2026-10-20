---
description: Systematically reproduce a bug, identify its cause, implement the smallest safe fix, and verify it with regression evidence.
---

Invoke the `debugging-agent` workflow from `developer-skill`.

1. Inspect the active project, reported behavior, relevant requirements, and available test runner.
2. Reproduce the failure with a minimal deterministic case whenever feasible.
3. Identify and explain the root cause using observed evidence.
4. Add or update a regression test when appropriate.
5. Apply the smallest authorized code change needed to fix the defect.
6. Re-run the reproduction and relevant regression checks.
7. Report changed files, commands run, result states, known limitations, and remaining risk.

Never claim a defect is fixed without fresh execution evidence.
