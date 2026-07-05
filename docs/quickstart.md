---
id: quickstart
title: Quickstart
description: Get PRAXIS up and running in 5 minutes.
---

# Quickstart 🚀

This guide gets you from zero to a working PRAXIS setup. You'll install the CLI, configure your first project, and run a verification.

## Prerequisites

- **Node.js** 18+ (recommended: 22.x)
- **npm** 9+ or **yarn** 1.22+
- A terminal with Git access

## 1. Install PRAXIS CLI

```bash
npm install -g @praxis/cli
```

Or install locally in your project:

```bash
npm install --save-dev @praxis/cli
```

Verify the installation:

```bash
praxis --version
# v2.0.0
```

## 2. Initialize a Project

Create a new PRAXIS project or add PRAXIS to an existing one:

```bash
# Create a new project
praxis init my-project
cd my-project

# Or add to existing project
praxis init --existing
```

This creates a `.praxis/` directory with the default configuration:

```text
my-project/
├── .praxis/
│   ├── config.yaml       # PRAXIS configuration
│   └── tasks/            # Task definitions
├── package.json
└── README.md
```

## 3. Write Your First TaskSpec

TaskSpec defines what "done" means. Create `.praxis/tasks/hello.yaml`:

```yaml
id: hello-world
name: Hello World
description: A simple task that creates a hello.txt file
gates:
  evidence:
    - type: file_exists
      path: hello.txt
  test:
    - type: content_match
      path: hello.txt
      pattern: "Hello, PRAXIS!"
```

## 4. Run the Task

```bash
praxis run hello-world
```

You'll see output like this:

```text
┌─ PRAXIS v2.0 — Running hello-world
├─ Executing agent task...
├─ ✓ Evidence Gate: hello.txt exists
├─ ✓ Test Gate: content matches pattern
├─ ✓ Final Gate: ALL PASSED
└─ 🎉 Task hello-world COMPLETE
```

## 5. Verify the Result

```bash
cat hello.txt
# Hello, PRAXIS!
```

The task passed all three verification gates — **evidence**, **test**, and **final**. You know it's really done.

## Next Steps

- **[Architecture Overview](/docs/architecture)** — Understand how PRAXIS works under the hood
- **[CLI Reference](/docs/guides/cli-reference)** — All available commands and flags
- **[Configuration Guide](/docs/guides/configuration)** — Customize PRAXIS for your project
- **[Getting Started Guide](/docs/guides/getting-started)** — A deeper walkthrough with examples
