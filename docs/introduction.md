---
id: introduction
title: Introduction
description: Welcome to PRAXIS — the parallel runtime for autonomous AI coding execution.
slug: /introduction
---

# Welcome to PRAXIS 🚀

PRAXIS is a **parallel runtime for autonomous AI coding execution** — a verification-first platform that ensures AI agents actually complete the tasks they claim to finish.

## Why PRAXIS?

AI coding agents are powerful, but they're also unreliable. Agents say "done" when they're not, hallucinate results, and leave broken code behind. **PRAXIS solves this** by introducing a verification layer that checks every claim against hard evidence.

### The Core Problem

```text
Agent says "done" → But is it REALLY done?
```

Without verification, there's no way to know. PRAXIS introduces the **Three Laws**:

| Law | Description |
|-----|-------------|
| **Completion Authority** | Agent says done ≠ done. Truth Engine FinalGate PASS = done. Nothing else counts. |
| **Write Authority** | No worker writes to shared integration files. The Deterministic Assembler is the only shared writer. |
| **Verification Authority** | FinalGate acceptance criteria comes from human-authored TaskSpec. An agent cannot verify its own completion. |

## Key Features

### 🛡️ Truth Engine
The core verification layer. Every agent claim is checked against file system changes, test results, and API responses. Three verification gates — **Evidence Gate**, **Test Gate**, and **Final Gate** — ensure nothing passes without proof.

### ⚙️ Deterministic Assembler
A single-writer pattern that prevents integration conflicts. Multiple agents can work in parallel, but only the assembler writes to shared files. No race conditions, no merge hell.

### ⚡ Parallel Execution
Spawn isolated subagents that work independently. Each gets its own conversation context, terminal session, and toolset — zero context pollution between workers.

### 🧩 Plugin Architecture
Everything in PRAXIS is a plugin. Custom verifiers, assemblers, tool providers, and execution backends can be added without modifying core logic. The system was redesigned around a plugin-first architecture (see ADR-013).

## How It Works

1. **Define a TaskSpec** — Human-authored acceptance criteria that define what "done" means
2. **Execute** — One or more agents work on the task in isolated environments
3. **Verify** — The Truth Engine runs each agent's output through three verification gates
4. **Assemble** — The Deterministic Assembler merges verified outputs into the final result
5. **Deliver** — Only fully verified, assembled results are presented as complete

## Getting Started

Ready to try PRAXIS? Head over to the [Quickstart Guide](/docs/quickstart) to get up and running in minutes.

## Project Status

PRAXIS is under active development. The architecture and core designs are complete. Implementation is ongoing across multiple tracks (D3/P1–P6).

- **Architecture**: ✅ Complete
- **Plugin System**: ✅ Designed
- **Truth Engine**: 🚧 In Development
- **CLI**: 🚧 In Development
- **Dashboard**: 📋 Planned
