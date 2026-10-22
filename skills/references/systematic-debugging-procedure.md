# Systematic Debugging & Root-Cause Investigation Procedure

**Document type:** Specialist Reference (`skills/references/systematic-debugging-procedure.md`)  
**Project:** APEX AI-SDLC Skill Framework  
**Reference Source:** APEX debugging workflow

---

## 1. The Four Mandatory Phases of Debugging

You MUST complete each phase before proceeding to the next.

### Phase 1: Failure Reproduction & Isolation
1. **Extract Exact Error Details:** Capture full stack trace, exception class, line number, and error code.
2. **Minimal Deterministic Reproduction:** Isolate the failing invocation into a minimal, runnable command or script.
3. **Verify Preconditions:** Confirm database state, mocks, and environment variables are in a known state.

### Phase 2: Hypothesis Formulation & Testing
1. **Formulate Explanatory Hypotheses:** Write down at least one clear hypothesis: *"The failure occurs because parameter X is undefined when Y is invoked."*
2. **Design Falsifiable Probe:** Add temporary logging or run an isolated assertion to validate or disprove the hypothesis.
3. **Inspect State at Failure Boundary:** Trace variable values immediately before the exception is thrown.

### Phase 3: Root-Cause Identification
1. **Differentiate Cause vs Symptom:** A null pointer is a symptom; passing an unvalidated parameter from an upstream module is the cause.
2. **Locate the Flawed Invariant:** Identify the specific logic error, boundary oversight, or state transition flaw in source code.

### Phase 4: Targeted Remediation & Regression Safeguard
1. **Add Reproduction Unit Test:** Commit or write a unit test demonstrating the bug in its failing state (RED).
2. **Apply Minimal Fix:** Modify source code to resolve the root cause (GREEN).
3. **Full Regression Check:** Re-run the untouched test suite to guarantee zero collateral damage.
