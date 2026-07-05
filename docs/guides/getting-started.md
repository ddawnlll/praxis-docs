---
id: getting-started
title: Getting Started Guide
description: A practical walkthrough of using PRAXIS to verify coding agent output.
---

# Getting Started Guide

This guide walks you through a real PRAXIS workflow — from setting up a project to verifying agent output and handling failures.

## Prerequisites

Make sure you've completed the [Quickstart](/docs/quickstart) first — you should have PRAXIS installed and know the basic verify loop.

## Setup

```bash
cd your-project
praxis init
```

This creates `.praxis/task.yaml`. If the file already exists from a previous session, `init` will not overwrite it.

## Writing a TaskSpec

The TaskSpec is the contract. It defines what "done" means. **A human must approve it.**

```bash
praxis spec --description "Add input validation to the signup form"
```

This drafts:

```yaml
# .praxis/task.yaml
id: PRAXIS-2026-002
description: Add input validation to the signup form
human_approved: false
acceptance_criteria:
  - id: AC-001
    description: Email field validates format
  - id: AC-002
    description: Password field enforces minimum length
  - id: AC-003
    description: Validation errors display inline
```

Edit the file to refine the criteria, then set `human_approved: true`.

## The Verify Loop

### 1. Agent Works

Let your coding agent work independently:

```bash
claude "Add input validation to the signup form"
```

PRAXIS is not involved here. The agent produces code, runs tests, makes commits — all in its normal flow.

### 2. Collect Evidence

```bash
praxis verify
```

The kernel collects:
- `git diff` — what files changed
- Terminal history — what commands ran (bun test, npm run typecheck, etc.)
- Test output — did tests pass?
- Any files the agent claims to have created

### 3. Gates Run

Each gate checks a specific claim:

```text
EvidenceGate: checking evidence exists...
  ✓ 3 files changed (git diff)
  ✓ bun test ran (command log)
  ✓ Test output captured

ExecGate: checking execution...
  ✓ bun test exited 0 (12 passed)
  ✓ bun run typecheck exited 0

FinalGate: checking criteria...
  ✓ AC-001: Email validation added
  ✓ AC-002: Password min length enforced
  ✓ AC-003: Inline error display added
  
Verdict: PASS ✓
```

### 4. Generate Report

```bash
praxis report
```

A signed audit report is written to `.praxis/reports/<run-id>.md`.

## Handling Failures

When verification fails, don't re-run the agent blindly. Use `praxis repair`:

```bash
praxis verify
Verdict: FAIL ✗

praxis repair
```

This generates a **RepairPacket** — a structured list of what failed and what the agent needs to fix:

```yaml
# RepairPacket targeting each failed criterion
targets:
  - criterion: AC-002
    issue: Password min length not enforced
    hint: Add minLength: 8 to the password input
  - criterion: AC-003
    issue: Validation errors not visible in UI
    hint: Add an error message component below each field
```

Give the repair packet to your agent:

```bash
claude "Fix these issues: [paste RepairPacket]"
```

Then re-verify:

```bash
praxis verify
```

## Tips

- **Keep TaskSpecs small and focused.** A single task should verify one thing.
- **Set `human_approved: true` explicitly.** The kernel checks this field.
- **Use `praxis status`** to see the current state of your workspace.
- **Evidence is stored in JSONL** at `.praxis/runs/<id>/evidence.jsonl` — inspect it directly if a gate's behavior is unclear.

## Next Steps

- **[CLI Reference](/docs/guides/cli-reference)** — All commands and flags
- **[Configuration Guide](/docs/guides/configuration)** — Customize your setup
