---
id: architecture
title: Architecture
description: How PRAXIS works — the Three Laws, Three Gates, Truth Kernel, and CLI plugin architecture.
---

# Architecture

PRAXIS is not a runtime or a coding agent. It is a **local Truth Kernel** — a deterministic verification engine that sits above coding agents and checks whether they actually completed the task.

## Overview

```text
┌───────────────┐     ┌──────────────────┐     ┌──────────────┐
│  .praxis/     │     │   Truth Kernel   │     │   Agent      │
│  task.yaml    │────▶│                  │◀────│  (Claude,    │
│  (human-      │     │  EvidenceGate    │     │   OpenCode,  │
│   approved)   │     │  ExecGate        │     │   etc.)      │
│               │     │  FinalGate       │     │              │
│               │     │                  │────▶│              │
│               │     │  RepairPacket    │     │              │
└───────────────┘     └──────────────────┘     └──────────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  .praxis/runs/   │
                     │  evidence.jsonl  │
                     │  .praxis/reports/│
                     └──────────────────┘
```

## The Three Laws

### Law 1 — Completion Authority

**Agent says done ≠ done. Truth Kernel FinalGate PASS = done. Nothing else counts.**

No agent can declare a task complete. Only the kernel, after passing through all three gates, can mark a task as done. The agent's own status messages are not evidence.

### Law 2 — Write Authority

**No worker writes to shared integration files. The Deterministic Assembler is the only shared writer.**

In future versions, multiple agents will work in parallel but write to isolated sandboxes. Only the assembler merges verified outputs. In v0.1, this applies to single-session use.

### Law 3 — Verification Authority

**FinalGate criteria come from human-authored TaskSpec only. An agent cannot define or verify its own completion criteria.**

The TaskSpec is written (or at minimum approved) by a human. Agent-drafted criteria are drafts only — they become binding only after human approval.

## The Three Gates

### EvidenceGate

Checks that verifiable evidence exists for the agent's claims:

- **Git diff** — Were files actually changed?
- **Command logs** — Were commands actually executed?
- **Test output** — Were tests actually run?
- **File existence** — Do the claimed output files exist?

EvidenceGate answers: *"Can we see proof the agent did something?"*

### ExecGate

Checks that commands and tests actually ran and passed:

- **Exit codes** — Did commands exit 0?
- **Test results** — Did tests actually run and pass? (checks for false-done where agent says "all tests pass" but never ran them)
- **Command presence** — Were the claimed commands actually in the terminal history?

ExecGate answers: *"Did the work actually execute correctly?"*

### FinalGate

Checks results against the human-approved acceptance criteria:

- **Criterion matching** — Does each AC pass?
- **Human approval** — Was the TaskSpec human-approved?
- **Evidence integrity** — Do agent claims match the evidence?

FinalGate answers: *"Does the result meet what the human asked for?"*

## Verdict Ladder

| EvidenceGate | ExecGate | FinalGate | Overall |
|-------------|----------|-----------|---------|
| PASS | PASS | PASS | **PASS** — task complete |
| HOLD | PASS | PASS | HOLD — evidence gaps |
| * | HOLD | * | HOLD — execution gaps |
| * | * | HOLD | HOLD — criteria gaps |
| FAIL | * | * | **FAIL** |
| * | FAIL | * | **FAIL** |
| * | * | FAIL | **FAIL** |

## Key Principles

- **Agent claims are not completion.** Kernel-verified evidence is completion.
- **Human-approved acceptance criteria are mandatory.** Agent-generated criteria are drafts only.
- **The plugin is a bridge, not the kernel.** Claude Code plugin displays verdicts; kernel produces them.
- **The kernel is agent-agnostic.** It verifies evidence from any coding agent (Claude Code, OpenCode, Gemini CLI, etc.).
- **Manual before automatic.** v0.1 is explicit operator-driven verify/repair.

## Current Scope (v0.1)

| Component | Status |
|-----------|--------|
| praxis CLI (6 commands) | Design complete |
| Truth Kernel (3 gates) | Design complete |
| Claude Code plugin | Design complete |
| RepairPacket generator | Design complete |
| Evidence store (JSONL) | Design complete |
| Desktop Mission Control | Future (v0.3+) |
| Server/runtime (Hono, HTTP) | Future (v0.2+) |
| PostgreSQL event log | Future (v0.2+) |
| Multi-worker orchestration | Future (v0.3+) |
| Auto-hook verification | Future (v0.2+) |
