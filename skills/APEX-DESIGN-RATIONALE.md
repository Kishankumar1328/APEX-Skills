# APEX Skill Framework Design Rationale

**Document type:** Architectural Design Record  
**Project:** APEX AI-SDLC Skill Framework  
**Status:** Approved

---

## 1. Architecture Mapping

| Dimension | APEX design decision |
|---|---|
| **Structure and packaging** | Standardized `skills/<skill-name>/SKILL.md` entries with specialist instructions, contracts, and platform guides. |
| **Instruction style** | Phase-based workflows, context awareness, boundaries, explicit stop conditions, and failure handling. |
| **Verification and evidence** | Fresh command execution, captured output, and explicit result states before completion claims. |
| **Cross-skill handoff** | `defect-handoff-contract.md` defines a closed-loop state machine with post-fix re-execution. |
| **Platform portability** | `PLATFORM-COMPATIBILITY.md` documents Antigravity, Cursor, Codex, and Claude Code mechanisms. |

---

## 2. Developer Skill Operational Profile

1. Inspect the workspace and dependencies.
2. Implement an atomic slice.
3. Run the relevant unit tests.
4. Run required security and quality checks.
5. Remediate failing checks.
6. Verify the final Git diff.

**Invariant:** No implementation completion claim without unit-test verification or static proof.

---

## 3. Testing Skill Operational Profile

1. Discover the test runner.
2. Map scenarios to approved requirements.
3. Execute automated suites using a fresh command.
4. Inspect exit codes and failure totals.
5. Produce defect reports with exact reproduction commands.
6. Require stakeholder approval for UAT sign-off.

**Invariant:** No passing-test claim without fresh terminal execution evidence.
