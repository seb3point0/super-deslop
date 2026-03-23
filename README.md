# Super Deslop

A bridge skill that composes [Superpowers](https://github.com/obra/superpowers), [Desloppify](https://github.com/peteromallet/desloppify), and [desloppify-api](https://github.com/seb3point0/desloppify-api) into one full-agency workflow. Build features with structured planning and subagent-driven execution while running code-health scans and quality gates in the same pass.

## How It Works

Instead of building first and cleaning up later, this bridge inserts desloppify checkpoints directly into the superpowers workflow:

```
bootstrap --> design --> plan --> implement --> quality gate --> finish
    |            |         |         |              |              |
  install     brainstorm  write    subagent      desloppify     verify
  deps if     + spec      plan +   driven dev    scan/review    score >=
  missing     approval    quality  with per-task  at batch       baseline
                          intent   file checks    boundaries
```

No upstream repos are modified. All dependencies upgrade independently.

## Architecture

```
superpowers (upstream, untouched)
  ^ invoked by skill name
super-deslop (this repo -- bridge skill + agent plugin)
  v imports library
desloppify-api (standalone Python wrapper)
  v depends on
desloppify (upstream, untouched)
```

## Prerequisites

- [Superpowers](https://github.com/obra/superpowers) installed for your platform
- Python 3.11+ with pip available

Python dependencies (`desloppify` and `desloppify-api`) are auto-installed — you don't need to install them manually.

## Installation

### One-Line Install (Claude Code or Codex)

```bash
curl -sSL https://raw.githubusercontent.com/seb3point0/super-deslop/main/setup.sh | bash
```

This auto-detects your platform, clones the repo, creates skill symlinks, and installs all Python dependencies.

### OpenCode

Add to your `opencode.json` (that's it — Python deps auto-install on first plugin load):

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "super-deslop@git+https://github.com/seb3point0/super-deslop.git"
  ]
}
```

Restart OpenCode. The plugin auto-registers the skill and auto-installs `desloppify` and `desloppify-api` on first load.

### Claude Code (manual)

```bash
curl -sSL https://raw.githubusercontent.com/seb3point0/super-deslop/main/setup.sh | bash
```

Or step by step:

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.claude/super-deslop
~/.claude/super-deslop/setup.sh
```

Restart Claude Code.

### Codex

```bash
curl -sSL https://raw.githubusercontent.com/seb3point0/super-deslop/main/setup.sh | bash
```

Or tell Codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/seb3point0/super-deslop/refs/heads/main/.codex/INSTALL.md
```

### Verify

Ask your agent: "Tell me about the super-deslop skill"

## Usage

Once installed, just describe your task. The bridge skill activates automatically when you ask to build something with code quality in mind:

```
Build me a user authentication system. Keep code quality high.
```

Or explicitly:

```
Use super-deslop to build [feature].
```

The workflow runs:

1. **Bootstrap** -- checks all prerequisites, guided install if missing, runs baseline scan
2. **Design** -- `superpowers:brainstorming` (spec, approval, review)
3. **Plan** -- `superpowers:writing-plans` + Quality Intent section (touched paths, slop risks, checkpoint cadence)
4. **Implement** -- `superpowers:subagent-driven-development` with:
   - Pre-task reuse checks (does existing code already do this?)
   - Per-task file checks via `desloppify-api` (catch naming, complexity, duplication immediately)
   - Per-batch scoped scans via `desloppify scan` (score delta, queue-driven fixes)
5. **Finish** -- verify strict score >= baseline, superpowers review passes, then merge/PR

## What It Catches

**Before writing code:** checks whether existing functions already do what the new code needs, preventing duplicate logic.

**After each task:** runs detectors on the modified files to catch naming inconsistencies, complexity growth, unused imports, and test gaps immediately while the agent still has context.

**After each batch:** runs a scoped desloppify scan to measure score impact and surface structural issues introduced by the feature work.

**Before merge:** verifies the feature branch didn't make code health worse.

## Testing

```bash
npm test
```

37 tests covering repository structure, bootstrap helpers, and skill contract validation.

## Updating

- **Superpowers:** follow its update mechanism per platform
- **Desloppify:** `pip install --upgrade "desloppify[full]"`
- **desloppify-api:** `pip install --upgrade git+https://github.com/seb3point0/desloppify-api.git`
- **Super Deslop:** `git pull` in the cloned directory, or restart your agent (plugin auto-updates)

## Related

- [superpowers](https://github.com/obra/superpowers) -- structured development workflow for coding agents
- [desloppify](https://github.com/peteromallet/desloppify) -- code-health scanning with persistent work queues
- [desloppify-api](https://github.com/seb3point0/desloppify-api) -- programmatic Python API for desloppify

## License

MIT
