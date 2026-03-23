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

Before installing super-deslop, you need:

1. **Superpowers** installed for your platform ([installation guide](https://github.com/obra/superpowers#installation))
2. **Desloppify** CLI: `pip install "desloppify[full]"`
3. **desloppify-api**: `pip install git+https://github.com/seb3point0/desloppify-api.git`

## Installation

### Claude Code

#### Via Plugin Marketplace (if available)

```bash
/plugin install super-deslop@seb3point0
```

#### Manual Install

1. Clone super-deslop next to your superpowers install:

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.claude/super-deslop
```

2. Create a skills symlink so Claude Code discovers the bridge skill:

```bash
mkdir -p ~/.claude/skills
ln -s ~/.claude/super-deslop/skills/super-deslop ~/.claude/skills/super-deslop
```

3. Install the Python dependencies:

```bash
pip install "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

4. Restart Claude Code. Verify by asking: "Tell me about the super-deslop skill"

### OpenCode

1. Add super-deslop to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "super-deslop@git+https://github.com/seb3point0/super-deslop.git"
  ]
}
```

2. Install the Python dependencies:

```bash
pip install "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

3. Restart OpenCode. The plugin auto-registers the bridge skill.

4. Verify by asking: "Tell me about the super-deslop skill"

### Codex

1. Clone the repo:

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.codex/super-deslop
```

2. Create a skills symlink so Codex discovers the bridge skill:

```bash
mkdir -p ~/.agents/skills
ln -s ~/.codex/super-deslop/skills/super-deslop ~/.agents/skills/super-deslop
```

3. Install the Python dependencies:

```bash
pip install "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

4. Restart Codex.

Or tell Codex directly:

```
Fetch and follow instructions from https://raw.githubusercontent.com/seb3point0/super-deslop/refs/heads/main/.codex/INSTALL.md
```

### Quick Install (any platform)

Tell your agent:

```
Fetch and follow instructions from https://raw.githubusercontent.com/seb3point0/super-deslop/refs/heads/main/INSTALL.md
```

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
