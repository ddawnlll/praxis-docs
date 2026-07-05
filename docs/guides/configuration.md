---
id: configuration
title: Configuration
description: Reference for the PRAXIS TaskSpec YAML format and environment configuration.
---

# Configuration

PRAXIS is configured through the `.praxis/task.yaml` file in your project root, plus environment variables.

## TaskSpec Format

The TaskSpec is a YAML file that defines the task to be verified.

```yaml
# .praxis/task.yaml
id: PRAXIS-2026-001
description: Add a health check endpoint to the API
human_approved: false
acceptance_criteria:
  - id: AC-001
    description: A GET /health endpoint returns 200
  - id: AC-002
    description: Response body includes {"status": "ok"}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | auto | Auto-generated task ID |
| `description` | string | yes | What the task does |
| `human_approved` | bool | yes | Must be set to `true` by a human before verification |
| `acceptance_criteria` | array | yes | List of criteria that define completion |

### Acceptance Criteria

Each criterion has:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (e.g., AC-001) |
| `description` | string | What passes this criterion. Be specific. |

### Example: Multi-criteria Task

```yaml
id: PRAXIS-2026-003
description: Refactor the auth module to use async/await
human_approved: true
acceptance_criteria:
  - id: AC-001
    description: All auth routes use async handlers
  - id: AC-002
    description: No .then() or callback patterns remain in auth/
  - id: AC-003
    description: All existing tests pass after refactor
  - id: AC-004
    description: TypeScript strict mode compiles without errors
```

## Evidence Store

Evidence from verification runs is stored in `.praxis/runs/<run-id>/evidence.jsonl`. Each line is a JSON object with:

| Field | Description |
|-------|-------------|
| `gate` | Which gate produced this evidence (evidence, exec, final) |
| `type` | Evidence type (git_diff, command_log, test_output, file_check) |
| `timestamp` | When the evidence was collected |
| `data` | The evidence payload |
| `passed` | Whether this piece of evidence passed its check |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PRAXIS_HOME` | PRAXIS data directory | `.praxis/` |
| `PRAXIS_LOG_LEVEL` | Log level: debug, info, warn, error | `info` |
| `PRAXIS_NO_COLOR` | Disable colored output | `false` |

## Plugin Configuration (Future)

The Claude Code plugin and other agent adapters will be configured through `.praxis/plugins/`. This is design-stage and not yet implemented in v0.1.

## TaskSpec Best Practices

1. **Be specific in criteria descriptions.** Vague criteria produce vague verdicts.
2. **One concern per criterion.** Don't bundle multiple requirements into one AC.
3. **Keep TaskSpecs focused.** A single task should verify one logical unit of work.
4. **Always set `human_approved: true`.** The kernel refuses to verify unapproved specs.
5. **Review and update.** TaskSpecs are living documents — refine them as you learn what works.
