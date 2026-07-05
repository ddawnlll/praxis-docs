---
id: claude-code-plugin
title: Claude Code Plugin
description: Install and use the PRAXIS Claude Code plugin for in-editor verification.
---

# Claude Code Plugin

The `@praxis/claude-plugin` bridges Claude Code to the PRAXIS Truth Kernel. It exposes slash commands that call the praxis CLI and display results directly in your Claude Code conversation.

The plugin is **read-only display + dispatch**. It never decides truth — the kernel does.

## Installation

### Prerequisites

- **Node.js** 20+ or **Bun** 1.0+
- **Claude Code** installed and authenticated
- **PRAXIS CLI** installed (`npm install -g @praxis/cli`)

### Install the Plugin

```bash
# From the PRAXIS monorepo
cd packages/claude-plugin
npm install
npm run build
```

Or install from npm (once published):

```bash
npm install -g @praxis/claude-plugin
```

### Configure Claude Code

Add the plugin to your Claude Code configuration. In your project root, create or edit `claude.json`:

```json
{
  "plugins": {
    "praxis": {
      "path": "/path/to/@praxis/claude-plugin/dist/index.js",
      "enabled": true
    }
  }
}
```

Or configure globally in `~/.claude/plugins.json`:

```json
{
  "plugins": {
    "praxis": {
      "path": "$(npm root -g)/@praxis/claude-plugin/dist/index.js",
      "enabled": true
    }
  }
}
```

### Configure the Plugin

Create `.praxis/plugin.json` in your project root:

```json
{
  "cliPath": "praxis",
  "defaultPlanPath": ".praxis/plan.yaml",
  "autoVerifyOnStop": false,
  "capturePreTool": true,
  "capturePostTool": true,
  "maxDiffBytes": 1048576,
  "evidenceDir": ".praxis/runs",
  "runIdPrefix": "plugin-run"
}
```

All fields have sensible defaults. You only need this file if you want to override them.

## Slash Commands

### `/praxis:init`

Initialize a PRAXIS workspace in the current project.

```
/praxis:init
```

Creates `.praxis/` directory with `plan.yaml`, `runs/`, and `reports/`. Safe to run multiple times.

**Calls:** `praxis init`

---

### `/praxis:spec`

Create or update a task specification.

```
/praxis:spec --description "Add input validation to the signup form"
```

Generates a PlanSpec with draft acceptance criteria. **A human must approve the plan** before verification.

**Calls:** `praxis spec`

---

### `/praxis:verify`

Run the three verification gates against the current plan.

```
/praxis:verify
```

Collects evidence (git diff, command logs, test output) and runs EvidenceGate, ExecGate, and FinalGate. Displays the verdict with per-gate results in your Claude Code session.

| Result | Meaning |
|--------|---------|
| PASS ✓ | All criteria met |
| HOLD ◐ | Evidence or execution gaps — needs repair |
| FAIL ✗ | Task not complete |

**Calls:** `praxis verify --task .praxis/plan.yaml --workspace .`

---

### `/praxis:repair`

Generate a repair packet targeting failed verification criteria.

```
/praxis:repair
```

Only meaningful after a HOLD or FAIL verdict. Produces a structured repair packet listing each failed criterion, the issue detected, and a hint for fixing.

**Calls:** `praxis repair --last-run`

---

### `/praxis:status`

Show the current workspace status.

```
/praxis:status
```

Displays the current task, approval state, last verdict, and run history.

**Calls:** `praxis status`

---

### `/praxis:report`

Generate a signed audit report.

```
/praxis:report
```

Writes a markdown report to `.praxis/reports/<run-id>.md` and displays a summary.

**Calls:** `praxis report`

## Architecture

```text
Claude Code Session
├─ /praxis:init        → praxis init
├─ /praxis:spec        → praxis spec
├─ /praxis:verify      → praxis verify
├─ /praxis:repair      → praxis repair
├─ /praxis:status      → praxis status
└─ /praxis:report      → praxis report
        │
        ▼
   praxis CLI (child_process.execFile — no shell)
        │
        ▼
  local Truth Kernel
  (.praxis/plan.yaml + evidence → gates → verdict)
        │
        ▼
  Formatted display in Claude Code
  (colored badges, structured verdicts, repair packets)
```

**Key design rules:**

| Rule | Why |
|------|-----|
| Plugin is read-only | The kernel owns truth. The plugin only displays it. |
| Plugin never decides completion | PASS/HOLD/FAIL comes from the kernel, not the plugin. |
| Plugin never modifies evidence | Evidence is captured independently. |
| execFile, not exec | Arguments are passed as an array — no shell injection risk. |

## What's Captured

The plugin captures evidence before and after tool use:

| Event | What's captured |
|-------|-----------------|
| Pre-tool | Working tree state, current branch, recent commands |
| Post-tool | Git diff, terminal output, test results, file changes |

This evidence is written to `.praxis/runs/<run-id>/evidence.jsonl` and fed to the Truth Kernel during verification.

## Implementation Status

| Component | Status |
|-----------|--------|
| Slash command handlers | ✅ Implemented |
| CLI execution bridge | ✅ Implemented |
| Result formatting | ✅ Implemented |
| Evidence capture (pre/post tool) | ✅ Implemented |
| npm package | ✅ Scaffolded |
| Claude Code plugin config | ✅ Designed |
| Published to npm | 🔜 Planned |

The plugin source lives in `packages/claude-plugin/` in the PRAXIS monorepo at [github.com/ddawnlll/praxis](https://github.com/ddawnlll/praxis).
