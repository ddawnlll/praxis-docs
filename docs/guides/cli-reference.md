---
id: cli-reference
title: CLI Reference
description: Complete reference for the PRAXIS CLI — init, spec, verify, repair, status, report.
---

# CLI Reference

The PRAXIS CLI is the primary interface for the Truth Kernel. It handles task definition, evidence collection, verification, repair, and reporting.

## Global Flags

| Flag | Description |
|------|-------------|
| `--help` | Show help for any command |
| `--version` | Show PRAXIS version |

## Commands

### `praxis init`

Initialize a PRAXIS workspace in the current directory.

```bash
praxis init
```

Creates `.praxis/task.yaml` (skeleton) and `.praxis/runs/` and `.praxis/reports/` directories. Safe to run multiple times — will not overwrite existing task specs.

---

### `praxis spec`

Create or update a task specification.

```bash
praxis spec --description "Add a health check endpoint"
praxis spec --file ./custom-task.yaml
```

**Options:**
| Flag | Description |
|------|-------------|
| `--description <text>` | Task description (generates skeleton criteria) |
| `--file <path>` | Load spec from a custom YAML file |

The generated TaskSpec requires human approval (`human_approved: true`) before verification will proceed.

---

### `praxis verify`

Run the three verification gates against the current task.

```bash
praxis verify
```

The kernel collects evidence (git diff, command logs, test output) then runs EvidenceGate, ExecGate, and FinalGate. Output is a structured verdict with per-gate results.

**Verdict values:**
- **PASS** — All criteria met
- **HOLD** — Some criteria need attention (evidence gaps, execution gaps)
- **FAIL** — Task not complete

**Options:**
| Flag | Description |
|------|-------------|
| `--gate <name>` | Run a specific gate only (evidence, exec, final) |
| `--verbose` | Show detailed evidence for each gate |
| `--json` | Output verdict as JSON |

---

### `praxis repair`

Generate a repair packet targeting failed verification criteria.

```bash
praxis repair
```

Outputs a structured RepairPacket listing each failed criterion, the issue detected, and a hint for fixing. Designed to be passed to a coding agent.

Must be run after a failed `verify`.

---

### `praxis status`

Show the current state of the PRAXIS workspace.

```bash
praxis status
```

Displays:
- Current task ID and description
- Whether the TaskSpec is human-approved
- Last verification verdict
- Number of runs and reports

**Options:**
| Flag | Description |
|------|-------------|
| `--json` | Output as JSON |

---

### `praxis report`

Generate a signed audit report for the last verification run.

```bash
praxis report
```

Writes a markdown report to `.praxis/reports/<run-id>.md` containing:
- Task ID and description
- Per-gate results with evidence summaries
- Overall verdict
- Timestamp and run ID

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | PASS — all gates passed |
| `1` | FAIL — one or more gates failed |
| `2` | HOLD — gates passed with gaps |
| `3` | Error — execution failed (invalid config, missing task, etc.) |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PRAXIS_HOME` | PRAXIS data directory | `.praxis/` |
| `PRAXIS_LOG_LEVEL` | Log level | `info` |
| `PRAXIS_NO_COLOR` | Disable colored output | `false` |
