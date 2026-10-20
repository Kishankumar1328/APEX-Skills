---
name: testing-skill
description: Coordinates independent software quality assurance, test execution, defect reporting, and fix verification on the active workspace. Use when running tests, hunting bugs, verifying regressions, or preparing release QA reports.
---

# Testing Skill

## Overview

Validate software behavior against documented requirements, execute appropriate automated and manual tests, report reproducible defects, and verify fixes using objective evidence.

This skill orchestrates testing specialists. It does not own product implementation or independently authorize releases. Never fabricate test execution, results, coverage, or verification claims. Preserve existing user changes and avoid unnecessary workspace artifacts.

## When to Use

- Execute automated or manual tests.
- Investigate defects, edge cases, and boundary conditions.
- Test failure handling, resilience, and security within authorized boundaries.
- Verify fixes and assess regression risk.
- Coordinate defect handoff and closure verification.
- Prepare QA reports, test evidence, and UAT findings.

## When Not to Use

- Product implementation or code remediation: use `developer-skill`.
- Initial product requirements or user stories: use `prd-agent`.
- Formal business UAT approval or release authorization: reserved for authorized human stakeholders.

## Operating Rules

1. Discover the repository, test configuration, documented requirements, and available tools before selecting commands.
2. Establish the scope and authorization boundaries before testing.
3. Select specialists based on actual requirements and risk; do not invoke every specialist for every task.
4. Never modify product source code merely to make a test pass.
5. Distinguish pre-existing failures from failures introduced by the current change whenever baseline evidence is available.
6. Execute commands using the actual project environment and record what was genuinely run.
7. Never claim that a test, scan, benchmark, or verification passed without supporting evidence.
8. Preserve user changes, use safe test data, and redact credentials, tokens, personal data, and other sensitive information from reports and logs.
9. Do not claim complete coverage, zero defects, or production readiness from limited testing.
10. Keep generated artifacts within established project conventions. Do not create generic testing documents or new directories without a clear need.

## Discover the Test Environment First

Inspect the available workspace before running tests.

- **Frameworks and runners:** Identify the actual tooling, such as `pytest`, `node --test`, Jest, Vitest, `cargo test`, or `go test`, when applicable.
- **Requirements:** Inspect available PRD, plan, acceptance criteria, API contracts, architecture documentation, and relevant implementation.
- **Project commands:** Inspect package manifests, build scripts, CI configuration, and existing test instructions.
- **Dependencies:** Determine which databases, services, environment variables, network mocks, and credentials are available.
- **Baseline:** Inspect Git status and relevant diffs. Run appropriate baseline checks when feasible and safe.
- **Artifacts:** Follow existing project conventions for test files, reports, and evidence. Do not assume particular filenames or directories exist.

If critical requirements or environment details are missing, document the uncertainty and continue only with checks that can be performed safely and meaningfully.

## Testing Workflow

```
  1. ESTABLISH ──→  2. INSPECT  ──→  3. STRATEGIZE ──→  4. AUTHOR
        │                   │                 │                 │
        ▼                   ▼                 ▼                 ▼
  Define scope        Detect test         Risk-based         Many-to-many
  & criteria          tooling & env       pyramid levels     traceable tests

  5. EXECUTE   ──→  6. CLASSIFY ──→  7. DEFECT/HANDOFF ──→ 8. QA REPORT
        │                   │                 │                 │
        ▼                   ▼                 ▼                 ▼
  Run terminal        7-state result      Redacted logs &    Consolidated QA,
  commands fresh      tally               repro handoff      metrics & risks
```

### Step 1: Establish Scope

Identify:

- The requested change or application behavior.
- Components and workflows in scope.
- Applicable acceptance criteria and expected outcomes.
- Required test levels and risk areas.
- Environment, data, access, and execution constraints.
- Explicit exclusions and unresolved requirements.

Do not invent acceptance criteria, API contracts, expected status codes, or business rules. Record material ambiguities.

### Step 2: Inspect the Environment

Discover available test commands, dependencies, fixtures, configuration, and existing failures.

Before execution, determine whether tests could affect real users, production data, external services, or paid resources. Use approved non-production environments and isolated test data whenever possible.

If a safe environment cannot be established, do not perform potentially destructive testing. Record the limitation.

### Step 3: Plan Risk-Based Coverage

Use the test pyramid as a general guide, not a mandatory allocation:

- Unit tests for isolated logic.
- Integration tests for component and dependency interactions.
- System and end-to-end tests for critical application workflows.
- Additional negative, security, performance, and UAT checks when justified by scope and risk.

Delegate only the relevant work to the available specialists:

| Specialist | Responsibility |
|---|---|
| `testing-strategy-agent` | Risk assessment, test levels, scope, and quality gates |
| `test-case-agent` | Test design, acceptance-criteria traceability, and coverage gaps |
| `functional-testing-agent` | User-facing behavior and business workflows |
| `integration-testing-agent` | API contracts, persistence, and dependency interactions |
| `system-testing-agent` | End-to-end behavior and application lifecycle |
| `regression-testing-agent` | Impact analysis and detection of change-related regressions |
| `negative-testing-agent` | Invalid inputs, boundary conditions, and failure handling |
| `performance-testing-agent` | Workload-based performance and resource measurements |
| `security-testing-agent` | Authorized security testing and evidence collection |
| `uat-agent` | User-journey simulation, usability observations, and UAT evidence |
| `complete-qa-agent` | Evidence reconciliation, defect status, and consolidated QA reporting |

Do not invoke a specialist simply because it appears in this list. Match the specialist to the requested scope, identified risks, available environment, and required evidence.

If a specialist or tool is unavailable, perform only the work that can be completed reliably and report the limitation.

### Step 4: Author Traceable Test Cases

Create or update test cases in the project's established test directories when required.

Each test case should define, as applicable:

- Unique identifier and purpose.
- Requirement or acceptance criterion.
- Preconditions, fixtures, and test data.
- Execution steps and expected results.
- Actual results and evidence.
- Priority or risk classification.
- Execution status and associated defects.

Maintain many-to-many traceability: one acceptance criterion may require multiple test cases, and one test case may cover multiple criteria.

Avoid duplicate tests and unnecessary test artifacts. Prefer existing test conventions and reusable fixtures. Do not modify product source code to make tests pass.

### Step 5: Execute Tests and Capture Evidence

Run the relevant project commands in the actual workspace.

Record:

- Exact command and execution context.
- Relevant environment or dependency limitations.
- Start time or duration when available.
- Actual exit code.
- Test selection and executed-test counts when available.
- Passed, failed, skipped, and other reported outcomes.
- Relevant stdout/stderr excerpts and failure evidence.
- Whether dependencies were mocked, simulated, or accessed live.

Capture output directly from execution. Redact sensitive information (tokens, passwords, keys, PII) before saving or sharing it.

A zero exit code alone is not sufficient evidence that all intended tests ran or that every required assertion was evaluated. Investigate unexpected counts, missing tests, incomplete execution, and contradictory evidence.

### Step 6: Classify Results Accurately

Use the following seven-state model consistently:

- **PASSED:** The test executed and its required assertions were satisfied.
- **FAILED:** The test executed and at least one required assertion failed.
- **BLOCKED:** Execution or meaningful verification was prevented by a dependency, permission, environment, or other blocker.
- **SKIPPED:** The test was intentionally not executed, with a documented reason.
- **NOT_RUN:** No execution occurred and no more specific status applies.
- **FLAKY:** Repeated comparable executions produced inconsistent outcomes. Preserve the individual run results and evidence.
- **INCONCLUSIVE:** Available evidence is insufficient to determine whether the expected behavior was satisfied.

Apply one primary status to each test for each reported execution cycle. If a test changes from failing to passing on rerun, retain the original failure and the subsequent result; do not erase history or automatically label the final result as passed without explaining the discrepancy.

Do not convert blocked, skipped, unexecuted, or inconclusive checks into passes.

### Step 7: Report Defects and Handoff

Use `skills/defect-handoff-contract.md` when it exists and is applicable.

A defect report should include, where available:

- Defect identifier and concise title.
- Affected component and environment.
- Preconditions and deterministic reproduction steps.
- Exact reproduction command when applicable.
- Expected versus actual behavior.
- Relevant error messages and redacted logs.
- Supporting screenshots, test output, or other evidence.
- Severity, impact, and confidence, clearly distinguished.
- Related requirements, test cases, and change references.
- Current status and unresolved questions.

Report confirmed defects separately from suspected defects and test-infrastructure failures.

If the handoff contract is missing or incomplete, do not invent its schema. Record the missing dependency and use a clearly labeled minimal handoff containing the available evidence.

Route implementation and remediation work to `developer-skill`. Do not claim that a handoff was completed unless the available platform actually performed it.

### Step 8: Verify Fixes and Prepare the QA Report

After an authorized fix is available:

1. Inspect the relevant change and confirm the intended fix is present.
2. Re-run the original failing reproduction or the closest valid equivalent.
3. Verify the relevant assertions and confirm the intended test actually executed.
4. Run impact-based regression checks, expanding to broader suites when required by risk, project policy, or release criteria.
5. Compare results with the recorded baseline where available.
6. Reopen or retain the defect if evidence contradicts closure.
7. Record any checks that remain blocked, skipped, flaky, inconclusive, or unexecuted.

A defect can be marked verified closed only when its defined closure criteria are satisfied by evidence. If the reproduction test passes but relevant regression checks fail, report the conflicting results rather than closing the defect unconditionally.

Do not treat a successful test run as proof that unrelated functionality is defect-free.

## QA Reporting Requirements

The final report should summarize:

- Scope and requirements evaluated.
- Test environment and execution period, when available.
- Test levels and specialists actually used.
- Commands and test suites actually executed.
- Results by primary status.
- Confirmed defects, suspected defects, and unresolved failures.
- Fix verification and regression evidence.
- Mocked versus live dependency coverage.
- Coverage gaps, blocked checks, and unassessed risks.
- Recommended next actions and release limitations.

Reconcile the reported totals with the underlying test ledger. Distinguish planned tests from executed tests and never imply that unexecuted checks passed.

Use explicit denominators for metrics. For example, calculate the pass rate among conclusive executed tests as:

`PASSED / (PASSED + FAILED) × 100`

State the metric definition and denominator. Report the rate as unavailable when the denominator is zero. Do not hide flaky or inconclusive tests by silently excluding them from the overall QA summary.

The report may recommend release readiness or identify release blockers, but formal approval remains with the authorized stakeholder.

## Common Rationalizations

| Rationalization | Required response |
|---|---|
| "The change was small, so regression testing can be skipped." | Assess change impact and run the regression checks justified by risk and project policy. |
| "Mocked integration passed, so live integration is proven." | State precisely what mocks verified and what live behavior remains unverified. |
| "The database was unavailable, but the code looks fine." | Report the affected checks as BLOCKED or INCONCLUSIVE, as appropriate. |
| "The command returned zero, so every test passed." | Verify the executed tests, assertions, output, and relevant exit status. |
| "The reproduction now passes, so the defect is closed." | Verify closure criteria and relevant regression evidence before closing. |
| "The simulated UAT looks good, so release approval is granted." | Report UAT findings and leave formal approval to the authorized human stakeholder. |

## Red Flags

- Claiming tests passed without actual execution evidence.
- Treating a mocked dependency as proof of live integration.
- Modifying application code without authorized remediation scope.
- Suppressing existing failures or overwriting user changes.
- Treating every HTTP 500 or nonzero exit code as a confirmed product defect without diagnosis.
- Claiming complete security, performance, or regression coverage from a limited check.
- Publishing credentials, personal data, or sensitive raw logs.
- Creating generic testing documents unrelated to the project's conventions.
- Claiming that a defect was handed off, fixed, or closed without evidence.

## Completion Checklist

- Scope, acceptance criteria, and authorization boundaries are documented.
- Test environment, tooling, and baseline were inspected.
- Relevant specialists were selected according to scope and risk.
- Test cases and requirement traceability (many-to-many) are maintained where applicable.
- Executed commands and available raw evidence are recorded.
- Results use the seven-state taxonomy consistently.
- Defects include reproducible steps and redacted supporting evidence.
- Authorized fixes received appropriate reproduction and regression verification.
- Metrics reconcile with the test ledger and disclose their denominators.
- Residual risks, unverified areas, and release limitations are explicit.
- Formal UAT and release approval remain with authorized human stakeholders.

**Completion rule:** Report only the work actually completed. If evidence is incomplete, identify the exact gap and its impact instead of declaring the testing process fully complete.
