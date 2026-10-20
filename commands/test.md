---
description: Run the APEX Testing Skill orchestrator to execute risk-based tests, investigate defects, verify fixes, and prepare QA reports.
---

# /test

Invokes the APEX Testing Skill in the current workspace.

## Usage

```text
/test [testing objective, acceptance criteria, or defect verification]
```

The Testing Skill coordinates the relevant specialists based on the requested task and identified risks.

Available specialists:

- `testing-strategy-agent`
- `test-case-agent`
- `functional-testing-agent`
- `integration-testing-agent`
- `system-testing-agent`
- `regression-testing-agent`
- `negative-testing-agent`
- `performance-testing-agent`
- `security-testing-agent`
- `uat-agent`
- `complete-qa-agent`

The orchestrator selects only the specialists required for the task, collects execution evidence, coordinates authorized defect handoffs to `developer-skill`, and produces a consolidated QA report.

Formal business UAT approval and release authorization remain with authorized human stakeholders.
