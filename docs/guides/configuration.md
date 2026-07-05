---
id: configuration
title: Configuration
description: Complete configuration reference for PRAXIS.
---

# Configuration ⚙️

PRAXIS is configured through a YAML file located at `.praxis/config.yaml` in your project root. This reference covers every configuration option.

## File Structure

```yaml
# .praxis/config.yaml — PRAXIS Configuration

project:
  name: my-project
  version: 2.0.0

execution:
  engine: auto
  max_workers: 3
  timeout: 300
  sandbox: true

gates:
  evidence:
    enabled: true
    checks:
      - file_exists
      - content_match
      - cmd_exit_code
  test:
    enabled: true
    pre_hook: npm run build
    command: npm test
    coverage:
      enabled: true
      threshold: 80
  final:
    enabled: true
    rules:
      - no_todos
      - diff_size: 500
      - docs_updated

plugins:
  directory: .praxis/plugins
  enabled: []

assembler:
  strategy: deterministic
  output_dir: .praxis/output

logging:
  level: info
  format: pretty
  file: .praxis/logs/praxis.log
```

## Top-Level Sections

### `project`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `name` | string | (directory name) | Project display name |
| `version` | string | `2.0.0` | Project version |

---

### `execution`

Controls how agents are executed.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `engine` | string | `auto` | Execution engine: `auto`, `local`, `docker`, `ssh`, `cloud` |
| `max_workers` | int | `3` | Maximum parallel agents |
| `timeout` | int | `300` | Agent timeout in seconds |
| `sandbox` | bool | `true` | Enable sandbox isolation |

**Engine backends:**

| Backend | Description |
|---------|-------------|
| `local` | Execute on the local machine |
| `docker` | Execute in Docker containers |
| `ssh` | Execute on remote machines via SSH |
| `cloud` | Execute on cloud infrastructure |
| `auto` | Automatically select based on environment |

---

### `gates`

Configures the three verification gates.

#### evidence

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | Enable evidence gate |
| `checks` | array | `all` | Specific checks to run |

Available checks: `file_exists`, `content_match`, `cmd_exit_code`, `git_diff`, `api_response`

#### test

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | Enable test gate |
| `pre_hook` | string | `null` | Command to run before tests |
| `command` | string | auto-detected | Test command |
| `coverage.enabled` | bool | `false` | Enable coverage checks |
| `coverage.threshold` | int | `80` | Minimum coverage percentage |

#### final

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `enabled` | bool | `true` | Enable final gate |
| `rules` | array | `[]` | Final gate rules |

Available rules: `no_todos`, `diff_size: <max>`, `docs_updated`, `changelog_updated`

---

### `plugins`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `directory` | string | `.praxis/plugins` | Plugin directory |
| `enabled` | array | `[]` | Enabled plugin names |

---

### `assembler`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `strategy` | string | `deterministic` | Merge strategy |
| `output_dir` | string | `.praxis/output` | Output directory |

---

### `logging`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `level` | string | `info` | Log level: `debug`, `info`, `warn`, `error` |
| `format` | string | `pretty` | Output format: `pretty`, `json`, `silent` |
| `file` | string | — | Optional log file path |

## Configuration Precedence

Settings are resolved in this order (later overrides earlier):

1. Default values (hardcoded)
2. `.praxis/config.yaml` (project config)
3. `~/.praxis/config.yaml` (user config)
4. Environment variables (`PRAXIS_*`)
5. CLI flags

## Environment Variable Reference

| Variable | Maps To | Example |
|----------|---------|---------|
| `PRAXIS_HOME` | Data directory | `~/.praxis/` |
| `PRAXIS_LOG_LEVEL` | `logging.level` | `debug` |
| `PRAXIS_TIMEOUT` | `execution.timeout` | `600` |
| `PRAXIS_MAX_WORKERS` | `execution.max_workers` | `5` |
| `PRAXIS_ENGINE` | `execution.engine` | `docker` |
| `PRAXIS_PLUGIN_DIR` | `plugins.directory` | `/opt/praxis-plugins` |
| `PRAXIS_GATE_EVIDENCE` | `gates.evidence.enabled` | `false` |
| `PRAXIS_GATE_TEST` | `gates.test.enabled` | `false` |
| `PRAXIS_GATE_FINAL` | `gates.final.enabled` | `false` |
| `PRAXIS_COVERAGE_THRESHOLD` | `gates.test.coverage.threshold` | `90` |
