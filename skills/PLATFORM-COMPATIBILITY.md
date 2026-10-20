# APEX Framework: Platform Compatibility & Invocation Guide

**Document type:** Platform Configuration & Integration Guide  
**Purpose:** Details how Developer and Testing skills are registered and invoked across Antigravity, Cursor, Codex, and Claude Code.

---

## 1. Antigravity IDE & AGY CLI

### Global vs Workspace Customization

- **Global Skills:** Located at `C:\Users\ADMIN\.gemini\config\skills\<skill-name>\SKILL.md`.
- **Workspace Skills:** Located at `<workspace-root>\.agents\skills\<skill-name>\SKILL.md`.
- **Invocation Triggers:** Slash commands such as `/develop` and `/test`, or natural-language skill triggers.

### Specialist Agent Delegation

When the host supports subagent delegation, `/develop` may use `coding-agent`, `debugging-agent`, `unit-testing-agent`, `security-scan-agent`, `code-review-agent`, `remediation-agent`, and `refactoring-agent`. `/test` selects only the testing specialists justified by the task, risk, and available tooling.

---

## 2. Cursor IDE

### Configuration via `.cursorrules` or `.cursor/rules`

In Cursor, skills and rules are defined through `.cursorrules` or individual rule files under `.cursor/rules/`:

- **Developer Rule:** Set matching globs for source files and instruct the assistant to execute TDD and local test runners.
- **Testing Rule:** Set the appropriate command or natural-language trigger, capture terminal output, and avoid creating dummy documentation files.

### Inline Specialist Simulation

When subagent dispatch is unavailable, the assistant performs the required specialist phases sequentially in the active chat context.

---

## 3. Codex & OpenAI Assistant Environments

### Tool Calling & System Instructions

- **Custom Instructions:** Define orchestrator workflows in the assistant's instruction prompt.
- **Function/Tool Schemas:** Expose approved terminal and file read/write tools.
- **Defect Logs:** Use structured JSON or Markdown conforming to `defect-handoff-contract.md`.

---

## 4. Claude Code

### Configuration via `CLAUDE.md`

Add command mappings directly to a project `CLAUDE.md`:

```markdown
## Development Commands
- /develop: Follow the APEX Developer Skill workflow (inspect, code, test, review)
- /test: Run the APEX Testing Skill with evidence-based reporting
```

Tool access runs approved commands directly and captures relevant stdout/stderr in the conversation.

---

## 5. Fallback Procedure for Unsupported Subagents

If the host platform does not support separate subagent execution processes:

1. The orchestrator explicitly announces relevant specialist phase transitions in chat output.
2. It follows each specialist's operating principles and evidence-capture rules.
3. It delivers one unified response using the standard reporting format.
