# Project Plan: APEX Developer Skill and Testing Skill

**Document type:** Project Implementation Plan (plan.md)  
**Project:** APEX AI-SDLC Skill Framework  
**Reference PRD:** [prd.md](file:///e:/SKILL/prd.md)  
**Status:** Implemented / Validation maintained

---

## 1. Project Objective

Establish two production-grade, reusable AI-SDLC skills within the APEX framework:
1. **Developer Skill**: Orchestrates implementation, debugging, unit testing, security scanning, code reviewing, remediation, and refactoring on the active project workspace without generating redundant documentation or fake test claims.
2. **Testing Skill**: Coordinates test strategy, test-case authoring, multi-level test execution (functional, integration, system, regression, negative, performance, security), UAT preparation, and consolidated QA reporting with objective evidence.
3. **Traceable Defect Handoff**: Connects confirmed testing defects to developer remediation and subsequent regression verification.

---

## 2. Scope & Non-Goals

### In Scope
- Standalone Developer Skill specification and specialist workflows (7 specialists).
- Standalone Testing Skill specification and specialist workflows (11 specialists).
- Standardized closed-loop defect handoff mechanism (Testing -> Development -> Verification -> Closure).
- Strict evidence-based reporting rules (commands, test output, pass/fail counts).
- Configuration compatibility guidance for Antigravity, Cursor, Codex, and Claude Code where platform capabilities allow.

### Non-Goals (Strict Out of Scope)
- Do NOT recreate or duplicate the existing PRD Agent or Planning Agent.
- Do NOT build a new IDE or coding platform.
- Do NOT produce redundant phase folders (.lighting-lifecycle/, .agents/phase/) inside target applications.
- Do NOT generate unverified or fake test claims.
- Do NOT trigger automated production deployments or destructive actions without human authorization.

---

## 3. Target Users & Core Use Cases

- **Target Users:** Software engineers, QA specialists, and AI agents collaborating on software engineering lifecycles.
- **Core Use Cases:**
  1. Trigger /develop or invoke Developer Skill to implement features or fixes with immediate automated unit test and security validation.
  2. Trigger /test or invoke Testing Skill to systematically discover and run test suites, measure coverage, and identify edge case bugs.
  3. Seamlessly hand off a reproducible defect from QA into remediation with reproduction steps and automated validation scripts.
  4. Re-run regression suites post-remediation to verify the fix with raw command evidence.

---

## 4. Implementation Approach & Proposed Architecture

### 4.1 Developer Skill Architecture (7 Specialists)
```
Developer Skill Orchestrator (/develop)
  ├── 1. Coding Agent (Feature implementation adhering to project conventions)
  ├── 2. Debugging Agent (Systematic root cause analysis & failure reproduction)
  ├── 3. Unit Testing Agent (Hermetic unit test authoring & execution)
  ├── 4. Security Scan Agent (SAST, dependency vulnerability checks & secret audits)
  ├── 5. Code Review Agent (Multi-axis quality, correctness, and regression review)
  ├── 6. Remediation Agent (Targeted defect resolution)
  └── 7. Refactoring Agent (Behavior-preserving maintainability improvements)
```

### 4.2 Testing Skill Architecture (11 Specialists)
```
Testing Skill Orchestrator (/test)
  ├── 1. Testing Strategy Agent (Test pyramid design & coverage priorities)
  ├── 2. Test Cases Agent (many-to-many acceptance-criteria traceability)
  ├── 3. Functional Testing Agent (User journeys & business rules)
  ├── 4. Integration Testing Agent (API endpoints, database, and service contracts)
  ├── 5. System Testing Agent (End-to-end integration flows)
  ├── 6. Regression Testing Agent (Validation of existing capabilities)
  ├── 7. Negative Testing Agent (Boundary, invalid inputs & fault tolerance)
  ├── 8. Performance Testing Agent (Load, latency, and resource metrics)
  ├── 9. Security Testing Agent (Authorized vulnerability & auth boundary probes)
  ├── 10. UAT Agent (Simulated realistic user journeys for stakeholder acceptance)
  └── 11. Complete QA Agent (Consolidated QA report with verifiable evidence)
```

### 4.3 Defect Handoff Contract
Defect reports must contain:
- **Defect ID & Severity:** (CRITICAL | HIGH | MEDIUM | LOW)
- **Affected Module/File:** Direct path reference
- **Reproduction Steps:** Deterministic, automated command/script
- **Observed vs Expected Output:** Raw terminal output or logs
- **Resolution State:** OPEN -> IN_REMEDIATION -> RESOLVED_PENDING_VERIFICATION -> VERIFIED_CLOSED

---

## 5. Implementation Phases & Milestones

| Phase | Milestone | Deliverables / Actions |
|---|---|---|
| **Phase 1** | **Planning & Alignment** | Deliver official plan.md in workspace root mapped to prd.md. Align specialist mandates and operating rules. |
| **Phase 2** | **Developer Skill Delivery** | Define Developer Skill instructions, operating boundaries, specialist delegation, and unit test/verification rules. |
| **Phase 3** | **Testing Skill Delivery** | Define Testing Skill instructions, specialist delegation, evidence capture requirements, and QA report format. |
| **Phase 4** | **Defect Handoff & Lifecycle Integration** | Establish defect data schema, handoff workflow between QA and Development, and post-fix regression test loop. |
| **Phase 5** | **Platform Validation & Verification** | Validate configuration compatibility across Antigravity, Cursor, Codex, and Claude Code environments. |

---

## 6. Key Technical Risks & Mitigations

| Risk | Impact | Mitigation Strategy |
|---|---|---|
| Duplicate agent/phase definitions | High | Enforce strict operating rule: inspect repository first, reuse existing global and workspace skills. |
| Unverifiable or fabricated test claims | High | Enforce evidence-based reporting rule: test results require executed command line and output summary. |
| Missing specialist platform support | Medium | Provide fallback inline procedures when subagent invocation or delegation is unsupported on the host platform. |
| Unsafe execution in production | Critical | Strict human-in-the-loop authorization gates for destructive actions or production environments. |

---

## 7. Acceptance Criteria Checklist

- [x] plan.md created in project root without creating duplicate phase folders.
- [x] Developer Skill coordinates all 7 defined specialist roles with clear input/output contracts.
- [x] Testing Skill coordinates all 11 defined specialist roles with objective evidence requirements.
- [x] No duplication or alteration of PRD Agent or Planning Agent capabilities.
- [x] Defect handoff protocol clearly defines reproduction steps, evidence, and post-fix verification.
- [x] Platform compatibility and invocation mechanisms are documented for Antigravity and target environments.
- [x] All verification and test results are reported with truthful terminal execution evidence.

**Validation boundary:** repository checks validate manifests, entry points, routing, schemas, and local fixture execution. They do not prove installation or native invocation in a live Codex, Claude Code, Cursor, or Antigravity host; that requires a separately authorized platform smoke test.
