# APEX AI-SDLC Operational Guidelines

This workspace is configured with the **APEX AI-SDLC Framework**.

## Available Skills & Triggers

When the user asks you to write code, fix bugs, test features, or audit security, invoke the appropriate APEX skill:

- **`/develop` or `developer-skill`**: For implementing features, authoring logic, refactoring, or remediation.
  - Automatically delegates to: `coding-agent`, `debugging-agent`, `unit-testing-agent`, `security-scan-agent`, `code-review-agent`, `remediation-agent`, `refactoring-agent`.
- **`/test` or `testing-skill`**: For executing quality assurance, test pyramids, and release certification.
  - Automatically delegates to: `testing-strategy-agent`, `test-case-agent`, `functional-testing-agent`, `integration-testing-agent`, `system-testing-agent`, `regression-testing-agent`, `negative-testing-agent`, `performance-testing-agent`, `security-testing-agent`, `uat-agent`, `complete-qa-agent`.

## Core Verification Rules
1. **Evidence Before Assertion**: Always run the project's local test runner fresh in the terminal and capture exit codes and pass counts before claiming success.
2. **The Iron Law of Regression**: When a defect is fixed, re-run the full regression test suite to ensure untouched capabilities remain functional.
3. **Closed-Loop Defect Handoff**: Follow `defect-handoff-contract.md` when logging defects and verifying remediations.
4. **Human Sign-Off Gate**: Present UAT evidence packs for human stakeholder approval; never self-award final release sign-off.
