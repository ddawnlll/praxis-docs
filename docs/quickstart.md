---
id: quickstart
title: Quickstart
description: Get PRAXIS up and running — install the CLI, define a task, and verify agent output.
---

# Quickstart

This guide takes you from zero to a working PRAXIS verification in minutes.

## Prerequisites

- **Node.js** 18+ or **Bun** 1.0+
- **Claude Code** (or any coding agent you want to verify)
- A terminal with Git access

## 1. Install PRAXIS

```bash
npm install -g @praxis/cli
```

Verify:

```bash
praxis --version
# v0.1.0
```

## 2. Initialize a Workspace

```bash
cd your-project
praxis init
```

This creates:

```text
.praxis/
├── task.yaml          # Task specification with acceptance criteria
├── runs/              # Evidence from verification runs
└── reports/           # Audit reports
```

## 3. Define a Task

```bash
praxis spec --description "Add a health check endpoint to the API"
```

This drafts a TaskSpec in `.praxis/task.yaml`. **A human must review and approve it** — set `human_approved: true` in the file.

```yaml
# .praxis/task.yaml
id: PRAXIS-2026-001
description: Add a health check endpoint to the API
human_approved: false  # ← must be set to true by a human
acceptance_criteria:
  - id: AC-001
    description: A GET /health endpoint returns 200
  - id: AC-002
    description: Response body includes {"status": "ok"}
```

## 4. Let Your Agent Do the Work

Now run your coding agent (Claude Code, OpenCode, etc.) independently. PRAXIS is not involved in the coding step.

```bash
claude "Add a health check endpoint to the API"
```

## 5. Verify

```bash
praxis verify
```

PRAXIS collects evidence — git diff, command output, test results — and runs it through the three gates:

```text
Collecting evidence...
  ✓ git diff: 2 files changed
  ✓ bun test: 12 passed, 0 failed
  ✓ command logs: bun test, bun run typecheck

EvidenceGate: PASS  (evidence exists)
ExecGate:     PASS  (tests actually ran)
FinalGate:    PASS  (2/2 criteria met)

Verdict: PASS ✓
```

## 6. Generate a Report

```bash
praxis report
```

A signed audit report is saved to `.praxis/reports/<run-id>.md`.

---

### Failure Path

If verification fails, PRAXIS tells you exactly what went wrong:

```text
praxis verify
EvidenceGate: PASS
ExecGate:     FAIL  (bun test: 0 tests ran)
FinalGate:    FAIL  (0/3 criteria met)

Verdict: FAIL ✗
```

Use `praxis repair` to generate a repair packet with specific instructions for the agent:

```bash
praxis repair
# → RepairPacket generated targeting each failed criterion
```

Then let the agent fix only the failures and re-verify.

---

## Next Steps

- **[Claude Code Plugin](/docs/guides/claude-code-plugin)** — Use PRAXIS from within Claude Code
- **[Architecture](/docs/architecture)** — How the three gates work
- **[CLI Reference](/docs/guides/cli-reference)** — All commands and flags
- **[Getting Started Guide](/docs/guides/getting-started)** — Deeper walkthrough with examples