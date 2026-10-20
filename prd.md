# APEX Developer Skill and Testing Skill — Product Requirements Document

**Document type:** Product Requirements Document (PRD)  
**Project:** APEX AI-SDLC Skill Framework  
**Scope:** Developer Skill and Testing Skill only  
**Status:** Draft

---

## 1. Overview

APEX requires two separate, reusable skills to support software development and software quality assurance:

1. **Developer Skill** — coordinates implementation, debugging, unit testing, security checks, code review, remediation, and refactoring.
2. **Testing Skill** — coordinates test planning, test-case design, functional and non-functional testing, defect reporting, regression verification, and QA reporting.

The skills must fit into the existing APEX framework and target application workflow. They must reuse existing framework capabilities and must not recreate the existing PRD Agent or Planning Agent.

## 2. Problem Statement

Development and testing responsibilities need clear separation, predictable workflows, reusable specialist responsibilities, evidence-based completion criteria, and reliable handoffs. Creating skill files without checking the repository or configuring the target platform's actual invocation mechanism can lead to duplicate files, unnecessary artifacts, and skills that appear to exist but cannot be invoked.

## 3. Goals

- Create a standalone Developer Skill and a standalone Testing Skill.
- Define clear responsibilities, workflows, inputs, outputs, and completion criteria for each skill and its specialists.
- Reuse existing APEX conventions, artifacts, tools, and configurations.
- Support Antigravity, Codex, Cursor, and Claude Code where their actual capabilities permit.
- Ensure specialist delegation and slash-command invocation are configured and validated rather than assumed.
- Require truthful, evidence-based reporting of tests, reviews, scans, and other checks.
- Support a clear defect handoff from Testing to Development and verification after a fix.

## 4. Out of Scope

- Rebuilding or duplicating the existing PRD Agent.
- Rebuilding or duplicating the existing Planning Agent.
- Creating a new coding platform or IDE.
- Replacing the application's existing architecture or toolchain without an approved requirement.
- Automatically deploying to production or performing destructive actions without authorization.
- Creating every possible script, reference, report, or artifact regardless of need.

## 5. Users and Use Cases

### Primary user
A developer or project contributor who invokes a skill to implement a change or validate an application.

### Core use cases
- Invoke the Developer Skill to implement an approved feature or fix.
- Invoke the Testing Skill to validate application behavior and report defects.
- Delegate work to the appropriate specialist agents when supported by the platform.
- Hand a confirmed defect from Testing to Development.
- Re-run relevant tests after a fix and record the actual outcome.
- Understand what was changed, what was tested, what failed, and what remains unresolved.

## 6. Skill A — Developer Skill

### 6.1 Purpose
Coordinate approved software changes while preserving existing architecture, coding conventions, tests, and requirements.

### 6.2 Specialist agents
1. **Coding Agent** — implements approved requirements and follows project conventions.
2. **Debugging Agent** — reproduces issues and investigates root causes before proposing fixes.
3. **Unit Testing Agent** — creates or updates focused unit tests and runs them where possible.
4. **Security Scan Agent** — checks authorized code and dependencies for relevant security weaknesses using available approved tools and vulnerability references, including NVD/NIST when applicable.
5. **Reviewing Agent** — reviews correctness, maintainability, regressions, security concerns, and requirement coverage.
6. **Remediation Agent** — fixes confirmed findings while preserving intended behavior and tests.
7. **Refactoring Agent** — improves internal code structure without intentionally changing externally observable behavior.

### 6.3 Workflow
1. Interpret the user's request and acceptance criteria.
2. Inspect repository instructions, project structure, relevant files, dependencies, conventions, and current test setup.
3. Reuse an approved plan or task breakdown if one exists; do not recreate Planning artifacts.
4. Identify affected components, dependencies, and risks.
5. Create a concise task checklist only when useful or required.
6. Delegate to specialists where supported by the platform.
7. Implement the smallest correct change within scope.
8. Run relevant unit tests and available static checks.
9. Perform applicable security checks and code review.
10. Remediate confirmed issues and rerun affected checks.
11. Review the final diff for regressions, unrelated edits, and incomplete requirements.
12. Report changed files, actual verification results, unresolved risks, and remaining work.

### 6.4 Requirements
- Follow existing architecture, project conventions, and approved requirements.
- Do not invent requirements or silently alter expected behavior.
- Avoid unrelated edits and unnecessary dependencies.
- Never hardcode or expose secrets.
- Do not delete or weaken tests to obtain a passing result.
- Do not claim a check passed unless there is evidence it ran successfully.
- Ask for clarification when a critical requirement is ambiguous.
- Obtain authorization before destructive or consequential actions outside the approved scope.
- Preserve existing PRD and Planning artifacts.

### 6.5 Inputs
- User request or approved task.
- Existing project instructions and code.
- Existing plan, task breakdown, or acceptance criteria when available.
- Available tools, dependencies, tests, and platform capabilities.

### 6.6 Outputs
- Code changes in the target application repository.
- Relevant tests and checks, updated where appropriate.
- A concise report of files changed, verification evidence, risks, and unresolved items.
- Additional artifacts only when required or genuinely useful.

### 6.7 Completion criteria
The requested change is implemented within scope; relevant available checks have been run or clearly marked as not run; findings are reported honestly; and no known blocker is presented as resolved without evidence.

## 7. Skill B — Testing Skill

### 7.1 Purpose
Validate software against documented requirements and observable behavior, identify defects, verify fixes, and produce evidence-based QA results.

### 7.2 Specialist agents
1. **Test Strategy Agent** — selects suitable test levels, coverage priorities, and risk-based approaches.
2. **Test Cases Agent** — creates traceable test cases, inputs, expected results, and edge cases.
3. **Functional Testing Agent** — checks user-facing and business functionality.
4. **Integration Testing Agent** — validates interactions among services, APIs, databases, and external dependencies.
5. **System Testing Agent** — tests the integrated application as a whole.
6. **Regression Testing Agent** — checks whether changes break previously working behavior.
7. **Negative Testing Agent** — checks invalid inputs, boundary conditions, failure scenarios, and error handling.
8. **Performance Testing Agent** — measures performance against explicit targets using available tools and an appropriate environment.
9. **Security Testing Agent** — performs authorized security testing within the approved scope.
10. **UAT Agent** — prepares user acceptance scenarios and records evidence; formal business acceptance remains with the authorized human stakeholder.
11. **Complete QA Agent** — consolidates test results, checks evidence and coverage, identifies unresolved risks, and prepares the final QA report.

### 7.3 Workflow
1. Identify the testing objective, application scope, expected behavior, and acceptance criteria.
2. Inspect requirements, plans, existing tests, application code, configuration, dependencies, tools, and environment constraints.
3. Reuse existing PRD, Planning, and Developer artifacts; do not recreate them.
4. Identify testable requirements, risks, and coverage gaps.
5. Select appropriate test levels and techniques.
6. Create or update a test strategy and test cases when needed.
7. Execute applicable tests using available tools and authorized environments.
8. Capture evidence such as commands, outcomes, error messages, and reproducible steps.
9. Classify results as confirmed defects, environment problems, flaky results, blocked, or inconclusive where evidence supports the classification.
10. Report defects with severity, reproduction steps, expected behavior, actual behavior, and supporting evidence.
11. After a fix, rerun relevant tests and appropriate regression checks.
12. Produce a QA summary with coverage, actual results, unresolved defects, limitations, and release risks.

### 7.4 Requirements
- Derive tests from documented requirements, expected behavior, and observable system contracts.
- Do not invent acceptance criteria and present them as approved requirements.
- Prefer reproducible tests and objective evidence.
- Distinguish passed, failed, blocked, skipped, and not-run tests.
- Never hide failures, remove useful tests, or weaken assertions to produce a passing report.
- Do not change application code just to make tests pass unless fixing code is part of the authorized task.
- Protect test data and avoid destructive actions against production systems.
- Obtain authorization before production testing, disruptive load testing, or intrusive security testing.
- Report uncertainty honestly.
- Do not claim formal UAT approval without approval from the authorized stakeholder.

### 7.5 Defect handoff
When a confirmed defect needs a code change:
1. Prepare a reproducible defect report.
2. Include affected component, severity, expected and actual behavior, reproduction steps, and evidence.
3. Hand off to the Developer Skill or its Debugging/Remediation specialists when the platform supports the workflow.
4. Do not assume a handoff means the defect has been fixed.
5. After a fix, rerun relevant tests and appropriate regression checks.
6. Record whether the defect is resolved, unresolved, or unverified.

### 7.6 Inputs
- Testing request and scope.
- Documented requirements and acceptance criteria.
- Existing project, test code, and environment.
- Available test tools and authorization boundaries.
- Prior defect reports and implementation changes when available.

### 7.7 Outputs
- Test strategy and test cases when needed.
- Executed test results with evidence.
- Defect reports and coverage gaps.
- Regression verification results after fixes.
- A final QA summary with risks and limitations.

### 7.8 Completion criteria
Applicable tests have been run or explicitly marked as blocked/not run; results are evidence-based; defects are reproducible where possible; unresolved risks are documented; and formal acceptance is not claimed without stakeholder approval.

## 8. Shared Platform and Repository Requirements

- Inspect the existing APEX repository before modifying it.
- Follow established naming and directory conventions.
- Keep framework skill definitions in the framework repository and application code/tests in the target application repository.
- Reuse existing files and update them rather than creating duplicates.
- Do not create a new skill directory inside the application repository unless explicitly requested.
- Configure platform-specific skill invocation and specialist delegation using the target platform's actual mechanisms.
- Support Antigravity, Codex, Cursor, and Claude Code only to the extent their actual capabilities and configurations allow.
- A Markdown file alone is not proof that a slash command or subagent is registered and executable.
- Add scripts, references, validators, evaluations, and reports only when needed.
- Validate paths, references, command registration, and specialist invocation where tooling allows.

## 9. Evaluation and Acceptance Criteria

### Developer Skill
- Correctly inspects the repository before making changes.
- Implements a small feature within the requested scope.
- Investigates a reproducible defect before applying a fix.
- Adds or updates a relevant unit test.
- Reports actual test and security-check results without unsupported claims.
- Avoids duplicate PRD/Planning artifacts and unrelated file changes.
- Correctly identifies blocked or ambiguous work.

### Testing Skill
- Selects appropriate tests for a small application feature.
- Identifies a missing test or reproducible defect.
- Tests invalid inputs and error handling where relevant.
- Records expected versus actual behavior and evidence.
- Reruns relevant tests after a fix and checks for regressions.
- Distinguishes failed, blocked, skipped, and not-run tests.
- Produces a QA report that matches the actual evidence.

### Cross-skill handoff
- Testing can create a defect report for Development.
- Development can implement an authorized fix.
- Testing can verify the fix without assuming success.
- The handoff status is explicit and traceable.

### Platform validation
- The skill can be invoked through the actual configured platform mechanism.
- Specialist delegation works where supported, or limitations are clearly documented.
- Available validators and evaluations are run, and results are recorded accurately.

## 10. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Duplicate skills or artifacts | Inspect the repository and reuse existing files first. |
| Slash command appears defined but does not work | Verify native platform registration and invocation. |
| False claims about test or scan results | Require execution evidence and explicit result states. |
| Developer and Testing responsibilities overlap confusingly | Keep implementation ownership with Developer and independent validation with Testing. |
| Unsafe testing or destructive actions | Require authorization and use appropriate non-production environments. |
| Too many unnecessary files | Create artifacts only when required or useful. |
| Incomplete defect handoff | Use reproducible reports and explicit status tracking. |

## 11. Implementation Plan

1. Inspect the current APEX repository and platform conventions.
2. Implement the Developer Skill and its seven specialists.
3. Validate Developer Skill structure, invocation, specialist delegation, and representative evaluations.
4. Implement the Testing Skill and its eleven specialists without duplicating shared framework capabilities.
5. Validate Testing Skill structure, invocation, test execution, evidence reporting, and representative evaluations.
6. Verify the end-to-end defect handoff and fix-verification workflow.
7. Document actual supported platforms, test results, limitations, and remaining work.

## 12. Success Metrics

- Both skills are independently discoverable and invocable through supported platform mechanisms.
- Specialist responsibilities and completion criteria are clear.
- No duplicate PRD Agent or Planning Agent is created.
- Unnecessary files and duplicate artifacts are avoided.
- Test, review, and security outcomes are reported accurately.
- Defect handoff and post-fix verification are demonstrably traceable.
- Evaluation results and platform limitations are documented.
