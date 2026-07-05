---
id: cli-reference
title: CLI Reference
description: Complete reference for the PRAXIS CLI commands, options, and flags.
---

# CLI Reference 💻

## Overview

The PRAXIS CLI is the primary interface for interacting with the runtime. It handles task execution, project management, and configuration.

## Global Options

| Flag | Description | Default |
|------|-------------|---------|
| `--config` | Path to config file | `.praxis/config.yaml` |
| `--verbose` | Enable verbose logging | `false` |
| `--quiet` | Suppress non-error output | `false` |
| `--no-color` | Disable colored output | `false` |
| `-h, --help` | Show help | — |
| `-V, --version` | Show version | — |

## Commands

### `praxis init [name]`

Initialize a new PRAXIS project.

```bash
praxis init my-project
praxis init --existing     # Add to existing project
```

**Options:**
| Flag | Description |
|------|-------------|
| `--existing` | Initialize in current directory |
| `--template <name>` | Use a template (default, minimal, strict) |
| `--yes` | Accept all defaults |

---

### `praxis run [task-id]`

Execute a task defined in a TaskSpec.

```bash
praxis run hello-world
praxis run --parallel task-a task-b task-c
praxis run --watch hello-world
```

**Options:**
| Flag | Description |
|------|-------------|
| `--parallel` | Run multiple tasks concurrently |
| `--watch` | Watch for changes and re-run |
| `--timeout <seconds>` | Per-agent timeout (default: 300) |
| `--agent <type>` | Agent type to use (openai, anthropic, local) |
| `--max-workers <n>` | Max parallel agents (default: 3) |

---

### `praxis verify [task-id]`

Run verification gates on a previously executed task without re-executing.

```bash
praxis verify hello-world
```

**Options:**
| Flag | Description |
|------|-------------|
| `--gate <name>` | Run specific gate (evidence, test, final) |
| `--output <format>` | Output format (text, json, junit) |

---

### `praxis status [task-id]`

Show the status of one or all tasks.

```bash
praxis status
praxis status hello-world
```

**Options:**
| Flag | Description |
|------|-------------|
| `--all` | Show all tasks (including completed) |
| `--json` | Output as JSON |

---

### `praxis plugin`

Manage PRAXIS plugins.

```bash
praxis plugin list
praxis plugin install <name>
praxis plugin remove <name>
praxis plugin update <name>
```

---

### `praxis config`

View or modify PRAXIS configuration.

```bash
praxis config show
praxis config set <key> <value>
praxis config get <key>
```

---

### `praxis doctor`

Diagnose common issues in your PRAXIS setup.

```bash
praxis doctor
```

Checks:
- PRAXIS version
- Configuration file validity
- Plugin compatibility
- Required dependencies
- Network connectivity

---

### `praxis dashboard`

Start the PRAXIS web dashboard.

```bash
praxis dashboard        # Start on default port (3000)
praxis dashboard --port 8080
```

---

### `praxis update`

Update PRAXIS to the latest version.

```bash
praxis update
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success — all gates passed |
| `1` | Error — execution failed |
| `2` | Verification failed — one or more gates did not pass |
| `3` | Configuration error |
| `4` | Plugin error |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PRAXIS_HOME` | PRAXIS data directory | `~/.praxis/` |
| `PRAXIS_LOG_LEVEL` | Log level | `info` |
| `PRAXIS_TIMEOUT` | Default task timeout (s) | `300` |
| `PRAXIS_MAX_WORKERS` | Max parallel agents | `3` |
| `PRAXIS_PLUGIN_DIR` | Plugin directory | `.praxis/plugins/` |
