# APEX AI-SDLC Skills

**Production-grade Developer and Quality Assurance Engineering Skills for AI Coding Agents.**

APEX encodes the operational workflows, quality gates, and testing disciplines that senior software architects and QA engineers use to build reliable software. Packaged as standardized agent skills, APEX empowers AI agents in **Google Antigravity**, **Claude Code**, **Cursor**, and **OpenAI Codex** to implement features test-first, diagnose defects systematically, audit security vulnerabilities against NVD/NIST databases, and certify release readiness with empirical evidence.

```
  SPEC & PRD          PLAN             DEVELOP               TEST              VERIFY & QA          RELEASE
 ┌────────────┐   ┌───────────┐   ┌─────────────────┐   ┌───────────────┐   ┌────────────────┐   ┌───────────┐
 │ PRD Agent  │──▶│ Plan Phase│──▶│ Developer Skill │──▶│ Testing Skill │──▶│ Complete QA    │──▶│ Authorized│
 │  (prd.md)  │   │ (plan.md) │   │   (/develop)    │   │    (/test)    │   │  (QA Report)   │   │  Rollout  │
 └────────────┘   └───────────┘   └─────────────────┘   └───────────────┘   └────────────────┘   └───────────┘
```

---

## Start Here

APEX is a workflow package for coding agents. It does not replace your project’s code, test runner, or release process. It gives an agent a repeatable way to choose a focused specialist, make only authorized changes, run relevant checks, and report evidence.

Use APEX in this order:

1. Open the application repository you want to work on. Do not run an application task inside this APEX package unless you are intentionally maintaining the framework.
2. Choose the outcome you want: implement, debug, test, review, or consolidate QA evidence.
3. Invoke the matching command or skill and describe the target, acceptance criteria, and constraints.
4. Read the final report: it must distinguish executed checks from checks that were not run.
5. Review the diff and test evidence before merging or releasing.

### The two orchestrator skills

| Skill | Use it when | Typical specialist selection |
|---|---|---|
| `developer-skill` | You need implementation, debugging, unit tests, refactoring, security scanning, remediation, or a code review. | `coding-agent`, `debugging-agent`, `unit-testing-agent`, `code-review-agent` |
| `testing-skill` | You need independent QA planning, functional/integration/system testing, regression checks, resilience testing, UAT evidence, or a QA summary. | `testing-strategy-agent`, `test-case-agent`, `functional-testing-agent`, `regression-testing-agent`, `complete-qa-agent` |

Do not invoke every specialist by default. The selected workflow should use only the specialists justified by the requested scope and risk.

### What a good request includes

Give the agent enough context to work safely:

```text
Use developer-skill. In the current project, add CSV export to the reports page.
Keep the existing API contract unchanged. Add focused tests, run the relevant checks,
and report the files changed, exact commands, exit codes, and remaining limitations.
```

For a review-only request, state that edits are not allowed. For a test-plan request, state whether you want a plan only or authorization to write and run tests.

## Commands

Five slash commands map directly to the software development and quality lifecycle. Each command invokes the corresponding orchestrator and delegates to specialized agents automatically:

| What you're doing | Command | Primary Specialist Agents | Key Principle |
|---|---|---|---|
| **Build & Implement** | `/develop` | `coding-agent`, `unit-testing-agent`, `code-review-agent` | Test-driven development; verify before completion |
| **Verify & Test** | `/test` | `testing-strategy-agent`, `functional-testing-agent`, `regression-testing-agent` | Tests are empirical proof; zero unverified assertions |
| **5-Axis Code Review** | `/review` | `code-review-agent`, `security-scan-agent` | Correctness, readability, architecture, security, performance |
| **Debug & Fix** | `/debug` | `debugging-agent` | Systematic diagnosis, surgical code modification, and regression verification |
| **Release Certification**| `/qa-summary` | `complete-qa-agent`, `uat-agent` | 7-state execution ledger; human sign-off gate enforced |

### Command examples

```text
/develop Add rate limiting to the login endpoint. Preserve existing response shapes and add tests.
/debug A user can submit the same order twice. Reproduce it, add regression coverage, fix it, and retest.
/test Validate checkout after the payment change. Include failure paths and regression scope.
/review Review the current diff only. Do not edit files. Return APPROVED or CHANGES_REQUESTED.
/qa-summary Consolidate the executed QA evidence and list blockers, untested areas, and release risks.
```

Commands may be exposed as slash commands only on platforms that support them. On other platforms, use the same wording in a normal chat message, for example: `Use testing-skill to create a risk-based test plan for checkout.`

## How to Use APEX

APEX has **20 registered plugin roles**: **2 orchestrator skills** that decide the workflow and **18 specialist agents** that perform focused work. You normally invoke a command or describe your goal in plain language; the relevant orchestrator then selects only the specialists that fit the request. You do not need to call every agent yourself.

| Role type | Count | What it does | How you use it |
|---|---:|---|---|
| Developer Skill | 1 | Owns implementation, bug fixes, refactoring, code review, unit tests, and security scanning. | Use `/develop` or ask to implement, fix, refactor, review, or scan code. |
| Testing Skill | 1 | Owns independent test planning, execution, defect reporting, regression verification, and QA reporting. | Use `/test` or ask to validate behavior, investigate test failures, run regression checks, or prepare QA evidence. |
| Development specialists | 7 | Perform focused engineering tasks selected by Developer Skill. | Usually selected automatically; use their name only when you need a specific phase. |
| Testing specialists | 11 | Perform focused test and quality-assurance tasks selected by Testing Skill. | Usually selected automatically; use their name only when you need a specific type of testing. |

The canonical specialist definitions and their derived `.agents/skills/` copies are declared in `framework-registry.json`; CI validates parity and one evaluation case per registered specialist.

### Choose the command by outcome

| If you want to… | Call this | What APEX will do | Typical result |
|---|---|---|---|
| Build a feature | `/develop Add CSV export to reports` | Inspects the project, implements the smallest approved change, adds appropriate tests, and reports evidence. | Source change plus test evidence. |
| Fix a bug | `/debug Users can submit the same order twice` | Reproduces the issue, finds the root cause, adds regression protection when feasible, fixes it, and retests. | Confirmed fix or a documented blocker. |
| Test a feature or release candidate | `/test Validate checkout after the payment change` | Selects risk-based tests, executes available checks, records evidence, and logs reproducible defects. | Test results using the seven-state model. |
| Review existing changes | `/review` | Reviews the active Git diff across correctness, readability, architecture, security, and performance. | `APPROVED` or `CHANGES_REQUESTED` with file and line citations. |
| Consolidate quality evidence | `/qa-summary` | Reconciles test evidence, defects, blockers, and residual risks. | QA summary; it does not grant release approval. |

### Specialist routing at a glance

| Your situation | Specialist selected | What the specialist is responsible for |
|---|---|---|
| Planned feature or enhancement | `coding-agent` | Implements a small, scoped change using established project conventions. |
| Existing defect or failing test | `debugging-agent` | Reproduces, diagnoses, fixes, and verifies an ordinary defect. |
| Need focused automated tests | `unit-testing-agent` | Creates and runs deterministic tests for an isolated unit. |
| Need an independent code assessment | `code-review-agent` | Reviews a diff and issues an evidence-based verdict without modifying code. |
| Security concern or dependency risk | `security-scan-agent` | Identifies potential vulnerabilities, risky dependencies, and exposed secrets. |
| Confirmed review/security finding | `remediation-agent` | Applies a minimal authorized fix and verifies it. |
| Code works but is hard to maintain | `refactoring-agent` | Improves structure without intentionally changing behavior. |
| Need a test plan or coverage strategy | `testing-strategy-agent` / `test-case-agent` | Defines risk-based coverage and traceable test cases. |
| Need behavior, API, or lifecycle validation | `functional-testing-agent` / `integration-testing-agent` / `system-testing-agent` | Tests business behavior, service boundaries, or the integrated application. |
| Need resilience, speed, or security probes | `negative-testing-agent` / `performance-testing-agent` / `security-testing-agent` | Tests bad inputs, measured performance, or authorized security boundaries. |
| Need post-fix confidence or user-journey evidence | `regression-testing-agent` / `uat-agent` | Checks change impact or prepares evidence for stakeholder acceptance. |
| Need one consolidated quality view | `complete-qa-agent` | Audits evidence and reports test status, defects, gaps, and release risks. |

### Result states and evidence

Use these states in test and QA reports. A state is meaningful only when it is supported by actual execution evidence.

| State | Meaning |
|---|---|
| `PASSED` | The intended checks executed and their required assertions passed. |
| `FAILED` | A verified check failed against the expected behavior. |
| `BLOCKED` | A material environment, dependency, access, or infrastructure issue prevented execution. |
| `SKIPPED` | The check was deliberately bypassed with a recorded reason. |
| `NOT_RUN` | The check was planned but not executed. |
| `FLAKY` | Comparable runs produced inconsistent results. |
| `INCONCLUSIVE` | The available evidence is insufficient or contradictory. |

A final report should include the target scope, files changed, exact commands, exit codes, relevant output, verdict, and unverified areas. A passing command is evidence for that command’s scope; it is not proof that the whole application is defect-free.

### Calling it on each platform

| Platform | Setup | Invocation |
|---|---|---|
| Codex | Install or attach the package with the Codex adapter manifest. | Use `/develop`, `/test`, `/review`, `/debug`, or `/qa-summary` where slash commands are supported; otherwise state the same request in plain language. |
| Claude Code | Start Claude Code with this repository as its plugin directory, as shown below. | Enter the command in chat, for example `/develop Add validation to the upload API`. |
| Cursor | Add the package/rules to the workspace configuration. | Use the corresponding command when configured, or ask in plain language and reference the intended workflow. |
| Antigravity | Copy the two skill directories to the global or workspace skill location shown below. | Invoke `/develop` or `/test`, or ask for the matching development or testing outcome. |

**Result states for tests:** `PASSED`, `FAILED`, `BLOCKED`, `SKIPPED`, `NOT_RUN`, `FLAKY`, and `INCONCLUSIVE`. APEX reports only checks that actually ran; formal UAT and release approval remain with an authorized human.

---

## Quick Start

### 1. Google Antigravity (AGY IDE & CLI)

#### Global Installation (Available across all workspaces)
Antigravity automatically discovers customizations stored in `%USERPROFILE%\.gemini\config\`:

```powershell
# Copy skills into global Antigravity customization root
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\config\skills"
Copy-Item -Recurse -Force "E:\SKILL\skills\developer-skill" "$env:USERPROFILE\.gemini\config\skills\"
Copy-Item -Recurse -Force "E:\SKILL\skills\testing-skill" "$env:USERPROFILE\.gemini\config\skills\"
```

Restart Antigravity, then invoke `/developer-skill` for implementation and fixes or `/testing-skill` for independent QA. You may also describe the outcome in plain language, for example: `Use developer-skill to add CSV export with tests.`

#### Workspace-Level Installation (Per-project)
Add to the `.agents/` folder at the root of your project repository:

```powershell
New-Item -ItemType Directory -Force -Path ".agents\skills"
Copy-Item -Recurse -Force "E:\SKILL\skills\developer-skill" ".agents\skills\"
Copy-Item -Recurse -Force "E:\SKILL\skills\testing-skill" ".agents\skills\"
```

Open the project in Antigravity and invoke `/developer-skill` or `/testing-skill`. Antigravity discovers workspace skills from `.agents/skills/<skill-name>/SKILL.md`.

### 2. OpenAI Codex

Codex can use the two workflows as **project-scoped skills**. In the repository where you want to use APEX, copy the skill folders and keep or merge the included `AGENTS.md` instructions:

```powershell
New-Item -ItemType Directory -Force -Path ".codex\skills"
Copy-Item -Recurse -Force "E:\SKILL\skills\developer-skill" ".codex\skills\"
Copy-Item -Recurse -Force "E:\SKILL\skills\testing-skill" ".codex\skills\"
if (-not (Test-Path ".\AGENTS.md")) { Copy-Item "E:\SKILL\AGENTS.md" ".\AGENTS.md" }
```

If the target project already has `AGENTS.md`, merge the APEX instructions into it manually; do not overwrite the project’s own instructions.

Start a new Codex chat in that repository and either explicitly invoke `$developer-skill` or `$testing-skill`, or write a direct request such as:

```text
Use developer-skill to fix the duplicate-order bug. Add a regression test and report the commands you ran.
```

For reusable desktop/CLI distribution, install this entire repository as a local plugin through a Codex marketplace rather than copying individual folders. The plugin package must retain root `plugin.json`, `.codex-plugin/plugin.json`, and `skills/` together. See the official [Codex plugin packaging and local marketplace guide](https://developers.openai.com/plugins/build/plugins).

This repository includes a ready-to-use local marketplace at `.agents/plugins/marketplace.json`. Register and install it with:

```powershell
codex plugin marketplace add "E:\SKILL"
codex plugin add "apex-sdlc-skills@apex-local"
codex plugin list
```

After upgrading APEX, refresh the marketplace and reinstall or update the plugin before starting a new Codex session.

### 3. VS Code with GitHub Copilot

VS Code itself does not load agent skills; install and sign in to the **GitHub Copilot** extension. For each project, copy the APEX instructions and skills:

```powershell
New-Item -ItemType Directory -Force -Path ".github", ".agents\skills"
Copy-Item -Force "E:\SKILL\.github\copilot-instructions.md" ".github\copilot-instructions.md"
Copy-Item -Recurse -Force "E:\SKILL\.agents\skills\*" ".agents\skills\"
if (-not (Test-Path ".\AGENTS.md")) { Copy-Item "E:\SKILL\AGENTS.md" ".\AGENTS.md" }
```

If `AGENTS.md` or `.github/copilot-instructions.md` already exists, merge the APEX content instead of overwriting that project’s instructions.

Open Copilot Chat in VS Code and use a plain-language request, for example: `Follow developer-skill and implement password reset with unit tests.` GitHub Copilot loads repository instructions from `.github/copilot-instructions.md`, `AGENTS.md`, and supported project skill folders; it does not provide APEX slash commands by default.

### 4. Cursor

Copy the rules and agent instructions into the target project:

```powershell
New-Item -ItemType Directory -Force -Path ".cursor\rules"
Copy-Item -Force "E:\SKILL\.cursor\rules\apex-sdlc.mdc" ".cursor\rules\apex-sdlc.mdc"
if (-not (Test-Path ".\AGENTS.md")) { Copy-Item "E:\SKILL\AGENTS.md" ".\AGENTS.md" }
```

If the project already has either file, merge the APEX guidance rather than overwriting it.

Open the project in Cursor and ask naturally: `Use the APEX testing workflow to regression-test this change.` Cursor automatically applies project rules in `.cursor/rules/` and reads `AGENTS.md`; `/develop` and `/test` are prompts defined by this package, not native Cursor commands.

### 5. Claude Code
Install as a native plugin or point Claude Code to the repository directory:

```bash
# Point Claude Code to this plugin directory
claude --plugin-dir /path/to/SKILL

# Or trigger commands directly in Claude Code chat
/develop Implement stripe webhook handler with hermetic unit tests
/test Run regression and security boundary probes
```

The Claude plugin exposes `/develop`, `/debug`, `/test`, `/review`, and `/qa-summary`. Start Claude Code from a target project with `claude --plugin-dir E:\SKILL`, then use one of those commands. The plugin namespace shown by Claude may prefix a command when another installed plugin uses the same command name.

When native subagent spawning is unavailable, Claude Code follows the specialist workflow sequentially in the active chat.

---

## Agent & Specialist Catalog

The APEX framework consists of **2 Orchestrators** and **18 Domain Specialists**:

### 1. Developer Skill (`skills/developer-skill/`)
Coordinates autonomous software development, test-first authoring, hermetic unit tests, and code quality audits directly in the active project workspace.

| Specialist Agent | Mandate & Key Capabilities | Verification Artifact |
|---|---|---|
| [`coding-agent`](skills/developer-skill/specialists/coding-agent.md) | Implements approved feature logic, API routes, data structures, and state machines following project conventions. | Verified source diffs |
| [`debugging-agent`](skills/developer-skill/specialists/debugging-agent.md) | Reproduces bugs, traces root causes, modifies source code, and verifies fixes with regression tests. | Verified source fix & test log |
| [`unit-testing-agent`](skills/developer-skill/specialists/unit-testing-agent.md) | Authors hermetic, deterministic unit tests (AAA pattern) isolating single functions without external network/DB calls. | Terminal test runner logs |
| [`code-review-agent`](skills/developer-skill/specialists/code-review-agent.md) | Performs multi-axis evaluation of code diffs: correctness, readability, architecture, security, and performance. | 5-axis review verdict |
| [`refactoring-agent`](skills/developer-skill/specialists/refactoring-agent.md) | Simplifies code structure, eliminates duplication, and optimizes readability while strictly preserving external behavior. | Green regression pass |
| [`remediation-agent`](skills/developer-skill/specialists/remediation-agent.md) | Applies minimal, surgical patches for defects identified by reviews, security scans, or failing reproduction tests. | Target patch diff |
| [`security-scan-agent`](skills/developer-skill/specialists/security-scan-agent.md) | Scans code, dependencies, and configs against NVD/NIST, CVEs, OWASP Top 10, and ISO/IEC 27001 standards. | 12-section security report |

### 2. Testing Skill (`skills/testing-skill/`)
Coordinates independent multi-level quality assurance, test strategy, test-case generation, fault injection, regression safety, and release certification.

| Specialist Agent | Mandate & Key Capabilities | Verification Artifact |
|---|---|---|
| [`testing-strategy-agent`](skills/testing-skill/specialists/testing-strategy-agent.md) | Models risk-based coverage prioritization and test pyramid distribution (Unit $\rightarrow$ Integration $\rightarrow$ System/E2E). | Test pyramid strategy |
| [`test-case-agent`](skills/testing-skill/specialists/test-case-agent.md) | Synthesizes verifiable, risk-based test cases with many-to-many acceptance-criteria traceability. | Traceability test matrix |
| [`functional-testing-agent`](skills/testing-skill/specialists/functional-testing-agent.md) | Validates user-facing operations, business domain rules, and state transitions against PRD specifications. | Functional test execution logs |
| [`integration-testing-agent`](skills/testing-skill/specialists/integration-testing-agent.md) | Validates boundaries: REST/GraphQL contracts, database persistence, transaction rollbacks, and queue handlers. | Contract & DB probe logs |
| [`system-testing-agent`](skills/testing-skill/specialists/system-testing-agent.md) | Tests full application lifecycle: cold bootstrapping, readiness probes (`/readyz`), end-to-end workflows, and graceful shutdown. | Lifecycle execution trace |
| [`regression-testing-agent`](skills/testing-skill/specialists/regression-testing-agent.md) | Assesses regression risk with targeted, dependent, and broader checks as required by policy and release criteria. | Delta comparison baseline |
| [`negative-testing-agent`](skills/testing-skill/specialists/negative-testing-agent.md) | Injects corrupted payloads, type violations, boundary extremes, and expired auth; verifies no process crashes or secret leaks. | Fault matrix audit log |
| [`performance-testing-agent`](skills/testing-skill/specialists/performance-testing-agent.md) | Measures empirical latency percentiles ($p50, p95, p99$), RPS throughput, and heap memory growth against SLA budgets. | Benchmark SLA ledger |
| [`security-testing-agent`](skills/testing-skill/specialists/security-testing-agent.md) | Authorized vulnerability probes: Broken Object Level Authorization (BOLA/IDOR), SQLi, XSS, SSRF, and security headers. | Security probe findings |
| [`uat-agent`](skills/testing-skill/specialists/uat-agent.md) | Simulates real user personas stepping through acceptance journeys; packages demonstrable evidence for human sign-off. | UAT evidence pack |
| [`complete-qa-agent`](skills/testing-skill/specialists/complete-qa-agent.md) | Supreme quality auditor: tallies verified terminal test results into a 7-state ledger and issues the QA certification report. | QA Release Certification |

---

## Core Operating Principles

### 1. Evidence Before Assertion
Never declare that a feature works or a bug is fixed based on visual inspection or code reading. An assertion without an executed terminal command, exit code, and captured standard output is treated as unverified.

### 2. The Iron Law of Regression
Whenever a bug is fixed or code is refactored, the regression test suite must execute fresh. A bug fix is not complete until a dedicated reproduction test has been added to prove that the bug cannot recur.

### 3. The Immutable Human Sign-Off Gate
AI agents collect evidence, run tests, and prepare recommendations. Formal business acceptance (UAT) and production release approval are strictly reserved for authorized human stakeholders.

### 4. Zero Workspace Pollution
APEX operates directly within the existing project structure. It discovers existing test runners (`npm test`, `pytest`, `cargo test`, `go test`) and never creates unrequested boilerplate documentation or duplicate directories.

---

## Closed-Loop Defect Handoff Contract

APEX connects Testing and Development through a standardized, traceable defect lifecycle:

```
  [TESTING SKILL]                                     [DEVELOPER SKILL]
  Specialist finds defect                             Remediation Agent
         │                                                   │
         ▼                                                   ▼
┌──────────────────┐                                ┌──────────────────┐
│ DEFECT LOGGED    │                                │ SURGICAL FIX     │
│ - Exact command  │ ─────────────────────────────▶ │ - Minimal patch  │
│ - Expected/Actual│   defect-handoff-contract.md   │ - Repro test run │
└──────────────────┘                                └──────────────────┘
                                                             │
         ┌───────────────────────────────────────────────────┘
         ▼
┌──────────────────┐
│ VERIFIED CLOSURE │
│ - Repro test PASS│
│ - Regression PASS│
└──────────────────┘
```

1. **Defect Logged (`OPEN`):** The testing specialist records the defect in `defect-handoff-contract.md` with exact reproduction commands and failure diffs.
2. **Targeted Remediation (`IN_REMEDIATION`):** `remediation-agent` inspects the reproduction command, applies a minimal fix, and confirms the reproduction test passes.
3. **Regression Audit (`RESOLVED_PENDING_VERIFICATION`):** `regression-testing-agent` runs impact-based checks, expanding to broader suites when risk, policy, or release criteria require it.
4. **Verified Closure (`VERIFIED_CLOSED`):** Complete QA verifies terminal outputs and archives the defect.

---

## Directory Structure

```
E:\SKILL\
├── .antigravity-plugin/           # Antigravity IDE & AGY CLI manifest
│   └── plugin.json
├── .claude-plugin/                # Claude Code plugin manifest & commands
│   └── plugin.json
├── .cursor-plugin/                # Cursor IDE plugin integration
│   └── plugin.json
├── .codex-plugin/                 # OpenAI Codex assistant integration
│   └── plugin.json
├── commands/                      # Slash command definitions
│   ├── develop.md / develop.toml
│   ├── test.md / test.toml
│   ├── review.toml
│   ├── debug.toml
│   └── qa-summary.toml
├── hooks/                         # Cross-platform SessionStart hooks
│   ├── hooks.json                 # Claude Code / Copilot hook configuration
│   ├── hooks-cursor.json          # Cursor IDE hook configuration
│   ├── run-hook.cmd               # Windows polyglot wrapper script
│   └── session-start              # Skill context injection hook
├── skills/
│   ├── developer-skill/           # Developer Orchestrator (/develop)
│   │   ├── SKILL.md
│   │   └── specialists/           # 7 Developer Specialists
│   ├── testing-skill/             # Testing Orchestrator (/test)
│   │   ├── SKILL.md
│   │   └── specialists/           # 11 Testing Specialists
│   ├── defect-handoff-contract.md # Testing-to-Dev closed-loop contract
│   └── PLATFORM-COMPATIBILITY.md  # Multi-platform invocation guide
├── evals/                         # Evaluation cases & test fixtures
│   ├── cases/                     # 20 evaluation case definitions
│   ├── fixtures/                  # 5 realistic code fixtures
│   └── evaluation-report.json     # Master evaluation audit report
└── scripts/                       # Verification & evaluation runners
    ├── run-evals.js               # Master 4-stage evaluation runner
    ├── validate-apex-skills.js    # Specialist & frontmatter validator
    ├── validate-commands.js       # Slash command parity validator
    ├── validate-evals.js          # Evaluation schema validator
    └── validate-platform-integrations.js
```

---

## Verification & Evaluation Suite

APEX includes a built-in offline verification suite. It validates skill schemas, canonical/derived specialist parity, command routing, platform metadata, evaluation cases, and executable fixtures:

```bash
# Run the complete CI-equivalent suite
npm run ci

# Or run individual checks
node scripts/validate-apex-skills.js            # Validate all 18 specialists and SKILL.md files
node scripts/validate-framework-registry.js     # Validate canonical definitions, derived copies, and eval coverage
node scripts/validate-commands.js               # Validate slash command TOML/Markdown parity
node scripts/validate-command-routing.js        # Validate command targets
node scripts/validate-platform-integrations.js  # Validate all 4 IDE plugin manifests
node scripts/validate-evals.js                  # Validate all 20 eval schemas
node --test scripts/fixture-runner.test.js      # Verify fixture failure handling
node scripts/run-evals.js                       # Generate the offline evaluation report
```

For local CI-equivalent verification, Node.js 18 or newer is required. The project has no runtime dependencies:

```bash
npm run ci
```

This runs structural, registry, command, routing, evaluation-schema, platform-metadata, adapter-smoke, fixture-runner, and executable-fixture checks. GitHub Actions runs the same command for pushes and pull requests.

### Platform smoke-test boundary

The repository validates platform manifest structure and local paths offline. That confirms the package is internally consistent, but it does **not** prove native registration in a running Codex, Claude Code, Cursor, or Antigravity installation. Run the platform's own installation flow and invoke `/develop` or `/test` in a disposable workspace before treating a platform adapter as deployment-verified.

Current local evidence: Antigravity and Codex each completed a live skill invocation in a disposable calculator workspace and reported a successful test run. Claude Code and Cursor still require live invocation evidence.

### Live-platform verification checklist

Offline CI does not prove that a real agent host discovers and follows a skill. Use a disposable project such as `evals/fixtures/sample-app` copied outside this repository, then perform the following on each platform:

1. Confirm the APEX skill or command is visible in the platform UI.
2. Request one small test-only change through `developer-skill`.
3. Confirm the agent changes only the disposable project, runs the real test command, and reports the command, exit code, and test count.
4. Request a review-only task and a QA/test-plan task; confirm neither modifies code and each uses the appropriate workflow.
5. Temporarily introduce a failing assertion. Confirm the agent reports `FAILED` with the non-zero exit code and failure evidence; then restore the fixture and rerun tests.

Record the platform version, prompt, agent response, modified files, command, exit code, and result. Do not label a platform verified merely because its manifest passed validation.

## Troubleshooting

| Symptom | What to check |
|---|---|
| A skill is not visible | Restart the host after installation, confirm the manifest and skill folder are in the documented location, and begin a new chat/session. |
| A command is unavailable | Use a normal-language request naming `developer-skill` or `testing-skill`; not every host exposes slash commands. |
| The agent edits the wrong repository | Stop the task, confirm the active workspace path, and use a disposable test project for platform validation. |
| A test command fails | Preserve the command output, identify whether the cause is code, test, environment, or setup, and report the correct result state. |
| A platform manifest passes but the host does not load it | Treat it as an installation/discovery issue, not proof of a framework defect; capture host version and installation steps. |

## Releases

The current release is recorded in `plugin.json`, each platform adapter manifest, `package.json`, and [CHANGELOG.md](CHANGELOG.md). Keep those versions aligned and run `npm run ci` before creating a release tag.

---

## License

MIT © 2026 APEX Framework Contributors.
