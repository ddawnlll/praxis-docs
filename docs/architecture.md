---
id: architecture
title: Architecture
description: How PRAXIS works under the hood — the Three Laws, verification gates, and plugin system.
---

# Architecture 🏗️

PRAXIS is built around three core principles — the **Three Laws** — that guarantee agents actually complete their tasks.

## The Three Laws

### Law 1 — Completion Authority

> Agent says done ≠ done. Truth Engine FinalGate PASS = done. Nothing else counts.

No agent can declare a task complete. Only the Truth Engine, after passing through all three verification gates, can mark a task as done.

### Law 2 — Write Authority

> No worker writes to shared integration files. The Deterministic Assembler is the only shared writer.

Multiple agents can execute in parallel, but they write to isolated sandboxes. The Deterministic Assembler merges their verified outputs into shared files, preventing race conditions and conflicts.

### Law 3 — Verification Authority

> FinalGate acceptance criteria comes from human-authored TaskSpec. An agent cannot verify its own completion.

The criteria for "done" are defined by humans in a TaskSpec document. Agents execute the work, but they never define or verify their own success criteria.

## System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                      PRAXIS CLI                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  Plugin  │  │   CLI    │  │ Dashboard│  │   SDK    │ │
│  │  Manager │  │  Parser  │  │  Server  │  │  Client  │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘ │
├──────────────┴──────────────┴──────────────┴───────────┤
│                    Core Runtime                          │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │                 Truth Engine                     │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │ Evidence │  │   Test   │  │  Final   │      │   │
│  │  │   Gate   │  │   Gate   │  │   Gate   │      │   │
│  │  └──────────┘  └──────────┘  └──────────┘      │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Deterministic Assembler                │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Execution Engine                   │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │   │
│  │  │ Parallel  │  │ Sandbox  │  │ Resource │      │   │
│  │  │  Runner   │  │ Manager  │  │ Monitor  │      │   │
│  │  └──────────┘  └──────────┘  └──────────┘      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Verification Gates

### 1. Evidence Gate
Checks that the agent's claims are supported by verifiable evidence:
- File existence and content
- Test output and exit codes
- API response codes
- Git diff and commit status

### 2. Test Gate
Runs the project's test suite against the agent's changes:
- Unit tests
- Integration tests
- Lint checks
- Type checking

### 3. Final Gate
The ultimate authority — compares results against the human-authored TaskSpec:
- All acceptance criteria met
- No regressions introduced
- Documentation updated
- All gates pass

## Plugin System

PRAXIS uses a plugin-first architecture (ADR-013). Every component is a plugin:

| Plugin Type | Purpose | Examples |
|-------------|---------|----------|
| **Verifier** | Custom verification logic | File checker, API validator, regex matcher |
| **Assembler** | Merge strategies | Text merge, JSON merge, Git merge |
| **Executor** | Execution backends | Local, Docker, SSH, Cloud |
| **Tool** | Agent tools | Git, npm, Docker, curl |
| **Provider** | External integrations | GitHub, CI/CD, Slack |

## Data Flow

```text
┌─────────┐     ┌────────────┐     ┌───────────┐     ┌──────────┐
│ TaskSpec │────▶│  Execution │────▶│   Truth   │────▶│ Assembler │
│ (Human)  │     │  Engine    │     │  Engine   │     │           │
└─────────┘     └────────────┘     └───────────┘     └──────────┘
                      │                                    │
                      ▼                                    ▼
               ┌────────────┐                      ┌──────────┐
               │  Agent(s)  │                      │  Output  │
               │ (Parallel) │                      │ (Merged) │
               └────────────┘                      └──────────┘
```

1. A human writes a **TaskSpec** defining acceptance criteria
2. The **Execution Engine** spawns agent(s) in isolated sandboxes
3. Each agent works independently and produces output
4. The **Truth Engine** runs outputs through all three verification gates
5. The **Deterministic Assembler** merges verified outputs
6. Only fully verified results are delivered as complete

## Next Steps

- **[Quickstart Guide](/docs/quickstart)** — Get PRAXIS running in 5 minutes
- **[CLI Reference](/docs/guides/cli-reference)** — All commands and flags
- **[Configuration Guide](/docs/guides/configuration)** — Customize your setup
