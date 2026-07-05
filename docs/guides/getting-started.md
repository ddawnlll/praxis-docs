---
id: getting-started
title: Getting Started Guide
description: A deeper walkthrough of PRAXIS with practical examples.
---

# Getting Started Guide 🎯

This guide walks you through setting up PRAXIS for a real project, writing TaskSpecs, running parallel agents, and interpreting verification results.

## Prerequisites

Make sure you've completed the [Quickstart](/docs/quickstart) first — you should have PRAXIS installed and know how to run a basic task.

## Project Setup

### Initialize a New Project

```bash
praxis init my-awesome-project
cd my-awesome-project
```

This creates the standard project structure:

```text
my-awesome-project/
├── .praxis/
│   ├── config.yaml
│   ├── tasks/
│   │   └── example.yaml
│   └── plugins/
└── README.md
```

### Add to an Existing Project

```bash
cd existing-project
praxis init --existing
```

PRAXIS will detect your project type from `package.json`, `pyproject.toml`, `Cargo.toml`, etc., and configure sensible defaults.

## Writing TaskSpecs

A TaskSpec is a YAML document that defines:
- What the task does
- What evidence counts as proof of completion
- What tests must pass
- What final criteria determine success

### Basic TaskSpec

```yaml
id: add-unit-tests
name: Add Unit Tests for Auth Module
description: Write unit tests for the authentication module with at least 80% coverage
gates:
  evidence:
    - type: file_exists
      path: tests/test_auth.py
    - type: min_coverage
      threshold: 80
      scope: src/auth/
  test:
    - type: command
      cmd: npm test
      expected_exit: 0
    - type: command
      cmd: npm run coverage
      expected_pattern: "Lines: 8[0-9]%"
  final:
    - type: diff_size
      max_additions: 500
    - type: no_todos
```

### TaskSpec Reference

| Section | Purpose | Example Check |
|---------|---------|---------------|
| `evidence` | Verifiable facts | File exists, coverage ≥ 80% |
| `test` | Automated checks | Tests pass, lint clean |
| `final` | Quality gates | Diff size limit, no TODOs |

## Running Tasks

### Single Task

```bash
praxis run add-unit-tests
```

### Multiple Tasks in Parallel

```bash
praxis run --parallel task-a task-b task-c
```

### Watch Mode

```bash
praxis run --watch add-unit-tests
```

Reruns automatically when TaskSpec or source files change.

## Verification Output

Every run produces a detailed verification report:

```text
Task: add-unit-tests
────────────────────────────────────────
┌─ Evidence Gate ──────────────────────
├─ ✓ tests/test_auth.py exists
├─ ✓ Coverage in src/auth/: 87.3% ≥ 80%
├─ Status: PASS
│
├─ Test Gate ──────────────────────────
├─ ✓ npm test → exit 0 (12 passed)
├─ ✓ npm run coverage → "Lines: 87.3%"
├─ Status: PASS
│
├─ Final Gate ─────────────────────────
├─ ✓ Diff size: 342 additions ≤ 500
├─ ✓ No TODO/FIXME/HACK comments
├─ Status: PASS
│
└─ 🎉 ALL GATES PASSED
```

## Parallel Agent Execution

PRAXIS can spawn multiple agents to work on independent tasks simultaneously:

```bash
praxis run --parallel \
  implement-auth \
  add-unit-tests \
  write-docs
```

Each agent gets:
- **Isolated terminal** — No cross-agent interference
- **Independent context** — Separate conversation history
- **Dedicated sandbox** — Writes to isolated directories
- **Individual TO** — Separate timeout and resource limits

The **Deterministic Assembler** merges their verified outputs at the end.

## Plugin Configuration

PRAXIS plugins go in `.praxis/plugins/`:

```yaml
# .praxis/plugins/custom-verifier.yaml
name: my-custom-verifier
type: verifier
module: ./verifiers/my-verifier.ts
config:
  api_endpoint: https://api.example.com/verify
  timeout: 5000
```

Enable plugins in `.praxis/config.yaml`:

```yaml
plugins:
  - custom-verifier
  - docker-executor
  - slack-notifier
```

## Next Steps

- **[CLI Reference](/docs/guides/cli-reference)** — Full command documentation
- **[Configuration Guide](/docs/guides/configuration)** — Customize every aspect of PRAXIS
