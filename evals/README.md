# APEX Skill Framework Evaluations

This directory contains evaluation suites measuring whether APEX skills:
1. **Trigger** accurately on positive prompts.
2. **Stay quiet** on negative prompts belonging to other skills.
3. **Change agent behavior** to satisfy strict verification and quality criteria.

## The Three Evaluation Tiers

| Tier | What it checks | Execution Method | Runner |
|---|---|---|---|
| **Tier 1: Structural** | Frontmatter, naming, directory anatomy, platform manifests | Fast deterministic CLI | `node scripts/validate-apex-skills.js` |
| **Tier 2: Triggers & Routing** | Positive/negative prompts defined for orchestrators & 18 specialists | Fast deterministic CLI | `node scripts/validate-evals.js` |
| **Tier 3: Behavioral Fixtures** | End-to-end task execution against 5 isolated project fixtures | Automated runner with fresh assertions | `node scripts/run-evals.js` |

## Evaluation Fixtures

- `fixtures/sample-app/`: Clean calculator app for feature additions and unit tests.
- `fixtures/broken-code/`: Buggy application for testing debugging and remediation specialists.
- `fixtures/vulnerable-code/`: Insecure code with hardcoded secrets and eval() for security scans.
- `fixtures/refactor-target/`: Complex duplicated pricing logic for refactoring validation.
- `fixtures/api-service/`: HTTP service for integration, auth boundary, and negative fault testing.
