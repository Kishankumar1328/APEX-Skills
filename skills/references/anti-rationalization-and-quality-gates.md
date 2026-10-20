# Engineering Rules, Anti-Rationalization & Quality Gates

**Document type:** Shared Reference (`skills/references/anti-rationalization-and-quality-gates.md`)  
**Project:** APEX AI-SDLC Skill Framework  
**Status:** Mandatory Across All Engineering Tasks

---

## 1. Core Operating Principles

1. **Evidence Before Assertions:** No claim of success, fix, or pass is valid without fresh terminal execution output.
2. **Preserve Integrity:** Never delete, weaken, or comment out tests or assertions to force a passing result.
3. **Root Cause Over Symptom:** Never patch code based on assumptions without reproducing and understanding the failure.
4. **Scope Discipline:** Never introduce unrequested dependencies, speculative abstractions, or unrelated edits.

---

## 2. Anti-Rationalization Table

When agents face pressure, uncertainty, or fatigue, internal rationalizations often arise to skip mandatory steps. Every rationalization below is strictly prohibited:

| Common Agent Rationalization | Why It Is Invalid & Dangerous | Mandatory Correct Action |
|---|---|---|
| *"This change is so simple that running tests is unnecessary."* | Even trivial one-line edits frequently break syntax, types, or edge-case invariants. | **Run the full test suite.** Simple changes require minimal verification time. |
| *"I already know why the bug is happening without reproducing it."* | Guessing the root cause usually leads to symptom-patching and introduces secondary bugs. | **Reproduce the bug first.** Write a failing test demonstrating the defect before touching code. |
| *"The test failure is just a minor formatting or strictness issue; I'll loosen the assertion."* | Loosening assertions degrades the project's quality bar and masks real contract violations. | **Fix the underlying code** to satisfy the strict assertion, or clarify with the user. |
| *"I will implement the feature now and backfill unit tests later."* | Untested code immediately incurs technical debt and obscures regression boundaries. | **Follow test-first or hermetic test authoring** in the same change increment. |
| *"The agent reports 'SUCCESS', so everything must be working."* | Subagents and tools can fail silently or hallucinate passing status. | **Inspect the actual diff and test runner output** before reporting completion. |
| *"The requirements are a bit vague, but I'll assume standard defaults and proceed."* | Assumptions made without user alignment lead to wasted cycles and rework. | **Pause and ask for clarification** when a requirement materially impacts architecture. |

---

## 3. Strict Quality Gates

```
GATE 1: PRE-IMPLEMENTATION INSPECTION
- Did you read existing manifests, tests, and conventions?
- Did you verify approved PRD/Plan artifacts without recreating them?
- If NO -> STOP and inspect before editing.

GATE 2: CODE IMPLEMENTATION
- Is the edit minimal, idiomatic, and within approved scope?
- Are all secrets and credentials protected?
- If NO -> Refactor edit to minimal scope.

GATE 3: HERMETIC VERIFICATION
- Did you execute the actual test runner command fresh?
- Did all unit tests pass with zero failures?
- If NO -> Route to Debugging Agent.

GATE 4: SECURITY & QUALITY AUDIT
- Did you run dependency audit (npm audit / pip audit)?
- Did the Reviewing Agent review the final diff against all 5 axes?
- If NO -> Execute audit and code review.

GATE 5: COMPLETION & REPORTING
- Is every claim in the final report backed by executed command evidence?
- If NO -> Rerun command or state status as NOT_RUN.
```
