---
id: introduction
title: Introduction
description: PRAXIS is a local Truth Kernel for agentic coding tools. It verifies whether the agent actually completed the task.
slug: /introduction
---

# What Is PRAXIS?

**PRAXIS is a local Truth Kernel for agentic coding tools.** It verifies coding-agent outputs using human-approved acceptance criteria, local evidence, deterministic gates, and repair packets.

**PRAXIS is not a coding agent.** It does not write code. It does not compete with Claude Code, OpenCode, or any coding agent. **It sits above them** and answers one question: *did the agent actually do what it claimed?*

## The Problem

AI coding agents are powerful but unreliable completion reporters.

| Problem | Symptom |
|---------|---------|
| **False Done** | Agent says "done" but the diff is empty |
| **Echo Chamber** | Agent writes the acceptance criteria AND passes them |
| **Missing Evidence** | Agent claims tests passed but never ran them |
| **Self-Reported Truth** | Agent's own status messages treated as completion |
| **Scattered Verification** | Evidence spread across messages, files, and terminal output |

PRAXIS solves these by being an **independent verification authority**. It does not trust agent claims. It checks evidence.

## The Three Laws

```
LAW 1 — COMPLETION AUTHORITY
  Agent says done ≠ done.
  Truth Kernel FinalGate PASS = done.
  Nothing else counts.

LAW 2 — WRITE AUTHORITY
  No worker writes to shared integration files.
  The Deterministic Assembler is the only shared writer.
  (Future scope — single-session only in v0.1.)

LAW 3 — VERIFICATION AUTHORITY
  FinalGate criteria come from human-authored TaskSpec only.
  An agent cannot define or verify its own completion criteria.
```

## The Three Gates

| Gate | Question | Detects |
|------|----------|---------|
| **EvidenceGate** | Does evidence exist? | Empty diff, missing command logs, missing test output |
| **ExecGate** | Did commands/tests actually run? | Zero tests ran, commands not executed, test failures |
| **FinalGate** | Do results meet human criteria? | Criteria not met, task not human-approved, agent claims vs evidence |

## Current Status

- **Identity:** Local Truth Kernel for agentic coding tools
- **Design progress:** ~45% (D0-D1 complete)
- **Implementation progress:** 0% (not authorized yet)
- **Primary interface:** Claude Code plugin + praxis CLI
- **License:** MIT

## What PRAXIS Is Not

- ❌ A coding agent (does not write code, does not run its own agent loop)
- ❌ A Claude Code clone or competitor
- ❌ An OpenCode/MiMo clone
- ❌ "Only a Claude Code plugin" — the kernel is independent; the plugin is a bridge
- ❌ A desktop-first multi-agent orchestrator (not in v0.1)
- ❌ A server/runtime platform (not in v0.1)

## Roadmap

| Stage | Name | Status |
|-------|------|--------|
| D0 | Pivot Decision Lock | ✅ Complete |
| D1 | Plugin-First Design Pack | ✅ Complete |
| D2 | Truth Kernel Proof Design | 🔜 Next |
| D3 | Claude Code Plugin Spike Spec | Future |
| D4 | Final Design Lock Audit | Future |
| I0–I4 | Implementation | ⛔ Not authorized |

## Project Layout

```
praxis/
├── README.md
├── docs/
│   ├── decisions.md
│   ├── adr/
│   ├── product-scope.md
│   ├── phase-map.md
│   └── ...
├── artifacts/
└── pi/                          # Old Pi monorepo (reference only)
```
