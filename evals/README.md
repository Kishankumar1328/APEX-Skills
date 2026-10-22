# APEX Skill Framework Evaluations

This directory contains offline evaluation specifications and fixture tests for APEX skills. They do not, by themselves, measure live model behavior.
1. **Trigger** accurately on positive prompts.
2. **Stay quiet** on negative prompts belonging to other skills.
3. **Change agent behavior** to satisfy strict verification and quality criteria.

## The Three Evaluation Tiers

| Tier | What it checks | Execution Method | Runner |
|---|---|---|---|
| **Tier 1: Structural** | Frontmatter, naming, directory anatomy, platform manifests | Fast deterministic CLI | `node scripts/validate-apex-skills.js` |
| **Tier 2: Prompt specifications** | Positive/negative prompts and expected outputs defined for orchestrators & 18 specialists | Fast deterministic CLI; no model invoked | `node scripts/validate-evals.js` |
| **Tier 3: Executable fixtures** | Test commands, expected exit codes, and required output against isolated fixtures | Automated runner with explicit assertions | `node scripts/run-evals.js` |
| **Tier 4: Live agent behavior** | Specialist selection, delegation, evidence collection, and final reporting by an actual supported model host | Model-backed run with saved transcript | Not configured; reported as `NOT_RUN` |

`evaluation-report.json` records what was actually executed. A passing offline result means that schemas, registry coverage, routing contracts, platform metadata, and fixture commands passed; it is not evidence that an IDE installed the plugin or that a model followed the prompts.

## Evaluation Fixtures

- `fixtures/sample-app/`: Clean calculator app for feature additions and unit tests.
- `fixtures/broken-code/`: Buggy application for testing debugging and remediation specialists.
- `fixtures/vulnerable-code/`: Insecure code with hardcoded secrets and eval() for security scans.
- `fixtures/refactor-target/`: Complex duplicated pricing logic for refactoring validation.
- `fixtures/api-service/`: HTTP service for integration, auth boundary, and negative fault testing.
