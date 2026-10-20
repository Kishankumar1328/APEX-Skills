---
name: developer-skill
description: Coordinates approved software engineering implementations directly within the user's active project workspace. Use when implementing new logic, fixing bugs, refactoring, or running code-quality checks.
---

# Developer Skill

## Overview

The Developer Skill orchestrates software engineering tasks in the user's active project workspace. It classifies requests, delegates to the appropriate specialist, coordinates relevant verification, and reports evidence-backed outcomes.

It supports feature development, bug fixing, unit testing, security scanning, authorized remediation, independent code review, and behavior-preserving refactoring.

Do not create unrequested project scaffolding, documentation, dependencies, or unrelated files.

## When to Use

Use this skill for:

- Implementing approved features and user stories.
- Diagnosing and fixing application defects.
- Creating or updating unit tests.
- Scanning for security vulnerabilities, dependency risks, and exposed secrets.
- Reviewing code changes.
- Remediating authorized security findings and review defects.
- Refactoring code while preserving existing behavior.

Do not use it as the primary workflow for:

- Initial PRD authoring: use `prd-agent`.
- High-level planning and architecture: use the existing planning or architecture workflow.
- Independent, comprehensive QA across environments: use `testing-skill`.

When a request spans multiple workflows, use the appropriate skill for each responsibility without duplicating work.

## 1. Specialist Registry

The Developer Skill coordinates seven distinct specialists:

| Specialist | Responsibility | Boundary |
|---|---|---|
| `coding-agent` | Implements new features and planned development tasks. | Does not own the complete lifecycle of existing application defects. |
| `debugging-agent` | Reproduces, diagnoses, fixes, and verifies ordinary application defects. | Must not stop at diagnosis when an authorized source fix is feasible. |
| `unit-testing-agent` | Designs, implements, and executes unit tests. | Does not own unrelated production implementation. |
| `code-review-agent` | Independently reviews diffs for correctness, readability, architecture, security, and performance. | Reports findings; does not implement fixes. |
| `security-scan-agent` | Detects and reports vulnerabilities, dependency risks, and exposed secrets. | Does not silently modify application code or remediate findings. |
| `remediation-agent` | Handles authorized security remediation and review-driven fixes. | Does not replace scanning or independent review. |
| `refactoring-agent` | Improves structure and maintainability while preserving behavior. | Does not add features or own unrelated bug fixes. |

Use the existing agent definitions and supported platform invocation mechanisms. Never claim an agent was invoked or completed work unless the corresponding action occurred.

## 2. Task Classification and Routing

```
                       USER REQUEST (/develop)
                                  │
      ┌───────────────────────────┼───────────────────────────┐
      ▼                           ▼                           ▼
[FEATURE / STORY]         [BUG / DEFECT]              [SECURITY / CLEANUP]
      │                           │                           │
      ▼                           ▼                           ▼
coding-agent              debugging-agent             security-scan-agent /
(Minimal diff)          (Reproduce & isolate)         refactoring-agent
      │                           │                           │
      ▼                           ▼                           │
unit-testing-agent        Regression test (Red)               │
(Hermetic unit tests)     (when feasible)                     │
      │                           │                           │
      │                           ▼                           │
      │                   Modify source (Green)               │
      │                           │                           │
      └───────────────────────────┼───────────────────────────┘
                                  │
                                  ▼
                     [CONDITIONAL QUALITY GATES]
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
[Security Scanning / Audit]                       [Independent Review]
  security-scan-agent                              code-review-agent
         │                                         (APPROVED / CHANGES_REQUESTED)
  (Actionable Finding)                                     │
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  │ (if remediation authorized)
                                  ▼
                          remediation-agent
                     (Authorized fix & re-check)
                                  │
                                  ▼
                        Evidence-Based Report
                    (Proportionate status & logs)
```

### Feature development

Delegate to `coding-agent`.

- Inspect requirements, project conventions, and the relevant workspace.
- Implement the smallest complete change.
- Add or update appropriate tests, or delegate to `unit-testing-agent`.
- Run relevant verification.
- Request security scanning or independent review when required by policy, risk, or scope.
- Resolve actionable findings through the responsible specialist.

### Bug fixing

Delegate to `debugging-agent`.

The Debugging Agent owns the ordinary defect lifecycle:

1. Reproduce the failure where feasible.
2. Diagnose the root cause.
3. Add or update a regression test when appropriate and feasible (document justified exceptions if test-first reproduction is impractical).
4. Modify source code when authorized.
5. Verify the fix and inspect for unintended changes.
6. Report unresolved failures and limitations.

Do not require the user to manually call another agent for a routine handoff that this workflow is expected to orchestrate.

### Security findings

Use `security-scan-agent` for detection and `remediation-agent` for authorized fixes.

- Establish scan scope and authorization.
- Record findings with evidence and confidence.
- Validate applicability before remediation.
- Apply minimal authorized changes.
- Run relevant security checks and tests afterward.
- Request independent review when required.

A scanner alert is not automatically a confirmed exploitable vulnerability. A clean scan does not prove that the application is secure.

### Code review

Delegate to `code-review-agent`.

- Review the actual change set across the five quality dimensions (correctness, readability, architecture, security, performance).
- Require evidence for actionable findings.
- Keep defects separate from subjective style preferences.
- Produce explicit review contract verdicts (`APPROVED` or `CHANGES_REQUESTED` with file:line citations).
- Route ordinary application defects to `debugging-agent`.
- Route security findings to the security remediation workflow.
- Repeat review when required after corrections.

### Refactoring

Delegate to `refactoring-agent`.

- Establish the intended behavior and relevant baseline.
- Make minimal structural changes.
- Verify behavior preservation with appropriate tests.
- Investigate failures rather than weakening assertions.
- Avoid unrelated feature development and defect fixes.

### Unit testing

Delegate to `unit-testing-agent`.

- Discover existing test conventions.
- Design tests against documented behavior.
- Implement and execute tests when authorized.
- Route source defects to the responsible implementation specialist.

## 3. Orchestration Rules

### Selective invocation

Do not invoke every specialist for every task. Select agents according to the requested scope, change risk, applicable project policy, dependencies, and required verification.

### Test-driven development

Use Red → Green → Refactor when practical:

1. **Red:** Demonstrate that a meaningful test fails for the intended reason.
2. **Green:** Make the smallest correct change and demonstrate that the test passes.
3. **Refactor:** Improve structure when justified, preserving verified behavior.

Do not fabricate a failing test or claim a Red phase that was not observed. If test-first development is impractical, document the limitation and use the strongest feasible alternative.

### Verification failure routing & bounded retries

When verification fails:

1. Capture actual evidence.
2. Determine whether the cause is an application defect, test defect, environment issue, or unresolved requirement.
3. Route the issue to the responsible specialist (ordinary defects to `debugging-agent`, authorized security findings and review fixes to `remediation-agent`).
4. Retry only within a bounded process when a meaningful corrective action is possible.
5. Stop when blocked, unauthorized, or unable to make useful progress without clarification.

Never retry indefinitely just to obtain a green result.

### Independent review

Invoke `code-review-agent` when required by project policy, risk, or the requested workflow. Consume its actual verdict (`APPROVED` or `CHANGES_REQUESTED`) and findings; do not manufacture an approval.

## 4. Execution Procedure

### Step 1: Understand

Identify expected behavior, acceptance criteria, constraints, and the authorized scope. Do not invent requirements.

### Step 2: Inspect the project

Discover the relevant workspace, repository structure, manifests, package manager, test runner, scripts, configuration, and Git working-tree state.

For monorepos, identify the relevant package or service before running commands. Preserve unrelated user changes.

### Step 3: Plan verification

Identify applicable tests, quality checks, dependencies, permissions, and baseline requirements. Distinguish mandatory checks from optional recommendations.

### Step 4: Implement and delegate

Use the responsible specialist. Apply minimal changes, preserve user modifications, and avoid unrequested dependencies or speculative abstractions.

### Step 5: Verify

Run targeted tests first when appropriate, followed by broader checks according to change impact and project policy.

Capture actual commands, outputs, exit codes, and available test counts. Investigate failures and compare against trustworthy baseline evidence where available.

### Step 6: Review and remediate

Inspect the final diff. Run required independent review and route findings to the appropriate specialist. Verify corrections and repeat required checks.

### Step 7: Report

Return:

- Summary of the requested work.
- Actual files changed.
- Verification commands and evidence.
- Test, security, and review outcomes where applicable.
- Known baseline failures and environmental blockers.
- Remaining risks and unverified areas.
- Explicit final status.

## 5. Verification Policy

| Check | Application rule |
|---|---|
| Targeted tests | Run when relevant and feasible. |
| Broader regression tests | Run when required by policy or justified by risk. |
| Lint and type checks | Run when applicable to the changed scope and tooling is available. |
| Build | Run when relevant and feasible. |
| Security scan | Run when required by policy, risk, or requested scope. |
| Independent review | Run when required by policy, risk, or requested workflow. |

A check that was not executed must not be reported as passed.

A non-zero exit code indicates command failure; it does not automatically prove a source-code defect. Investigate the actual result.

Do not require every possible check for every task. Require applicable mandatory checks and disclose omitted checks.

## 6. Final Status

Use one primary status:

- `PASS`: Requested work is complete and applicable mandatory verification gates passed with supporting evidence.
- `FAIL`: A verified failure remains in the requested scope.
- `BLOCKED`: A material dependency, authorization, or environment issue prevents completion or required verification.
- `NOT RUN`: No relevant implementation or verification was performed.

Use the established project taxonomy if it requires additional statuses. Do not report `PASS` merely because files were modified or one command returned exit code zero.

## 7. Common Rationalizations

| Rationalization | Required response |
|---|---|
| "The Debugging Agent should only diagnose." | It owns ordinary defect fixing when source modification is authorized. |
| "The code is simple, so testing is unnecessary." | Run relevant checks proportionate to the change and policy. |
| "The root cause is obvious without reproduction." | Seek reproducible evidence; document justified exceptions. |
| "I can weaken the assertion to get a green result." | Preserve the contract and correct defective code or test logic. |
| "A passing suite proves zero regressions." | Report only the verified test scope and residual risk. |
| "A scanner reported a vulnerability, so exploitation is confirmed." | Validate applicability and confidence before making that claim. |
| "The environment is broken, so the source code must be defective." | Separate environmental failures from application defects. |
| "I should keep retrying until every check passes." | Stop when blocked or when further retries lack a justified corrective action. |

## 8. Red Flags

- Debugging stops at diagnosis when an authorized source fix is required.
- The user must manually perform an expected routine agent handoff.
- Tests are deleted, disabled, or weakened merely to obtain a pass.
- Security findings are remediated without the required authorization.
- Existing user changes are overwritten.
- Tests, builds, scans, or reviews are claimed as passed without evidence.
- Unrequested files, dependencies, or documentation are created.
- Failed checks are repeatedly rerun without addressing their cause.
- The task is marked complete while a mandatory gate remains unresolved.

## 9. Completion Checklist

Before completing the workflow, confirm:

- The relevant project and tooling were inspected.
- The task was routed to the correct specialist.
- Changes stayed within authorized scope.
- Existing user changes were preserved.
- Relevant tests were executed or limitations documented.
- Bug fixes have suitable regression protection where feasible.
- Applicable security and quality checks were performed or disclosed as not run.
- Independent review was completed when required.
- Findings and blockers were resolved or disclosed.
- The completion report contains actual evidence and a justified status.

## 10. Final Handoff

Explain what changed, what was verified, what remains uncertain, and what action is needed next.

The Developer Skill coordinates implementation and verification. It does not fabricate agent actions, guarantee defect-free software, or replace formal release approval by an authorized stakeholder.
