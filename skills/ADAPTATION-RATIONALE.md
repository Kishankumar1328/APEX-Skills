# APEX Skill Framework Adaptation: agent-skills & superpowers

**Document type:** Architectural Design Record & Adaptation Rationale  
**Project:** APEX AI-SDLC Skill Framework  
**Status:** Approved

---

## 1. Reference Architecture Mapping

| Dimension | Primary Reference: Addy Osmani (gent-skills) | Secondary Reference: Obra (superpowers) | APEX Skill Synthesis |
|---|---|---|---|
| **Structure & Packaging** | Clean folder organization (skills/<name>/SKILL.md), metadata YAML frontmatter, phase indexing, and modularity. | Minimalist root triggers, scripts/hooks where executable, self-contained subagents. | Standardized skills/<skill_name>/SKILL.md with supporting specialists/, contracts, and platform guides. |
| **Instruction Style** | Phase workflows, context awareness, boundary enforcement, non-negotiable behaviors. | **Operational procedures:** Iron Laws, Gate Functions, Red Flags, Stop Conditions, Failure Handling. | Procedural step-by-step checklists with explicit gating (NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE). |
| **Verification & Evidence** | Automated test runner execution, linting, code reviews across 5 axes. | Evidence before claims; exact terminal commands; stdout/stderr capture; red-green cycles. | Mandatory terminal execution capture; raw output logging; explicit status states (PASSED, FAILED, BLOCKED, NOT_RUN). |
| **Cross-Skill Handoff** | Phase-to-phase transition contracts (Spec -> Tasks -> Code -> Tests). | Rigorous code review requests/receptions, issue remediation loops. | defect-handoff-contract.md closed-loop state machine with mandatory post-fix re-execution. |
| **Platform Portability** | IDE-agnostic principles. | Explicit tool/subagent delegation vs inline execution fallbacks. | PLATFORM-COMPATIBILITY.md documenting Antigravity, Cursor, Codex, and Claude Code mechanisms. |

---

## 2. Developer Skill Operational Profile (develop)
- **Superpowers Gate Function:**
  1. Inspect workspace & dependencies.
  2. Implement atomic slice.
  3. Run local unit test command.
  4. Run security & code quality checks.
  5. Remediate failing checks.
  6. Verify clean git diff.
- **Iron Law:**
  `
  NO IMPLEMENTATION CODE WITHOUT UNIT TEST VERIFICATION OR STATIC PROOF
  `

---

## 3. Testing Skill Operational Profile (	est)
- **Superpowers Gate Function:**
  1. Discover test runner.
  2. Map test scenarios to PRD/Plan requirements.
  3. Execute automated test suites with fresh command.
  4. Parse exit code and failure tallies.
  5. Format defect reports with exact reproduction commands.
  6. Require stakeholder gate for UAT sign-off.
- **Iron Law:**
  `
  NO PASSING TEST CLAIMS WITHOUT FRESH TERMINAL EXECUTION EVIDENCE
  `
