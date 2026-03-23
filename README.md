# Super Deslop

A bridge that composes [Superpowers](https://github.com/obra/superpowers), [Desloppify](https://github.com/peteromallet/desloppify), and [desloppify-api](../desloppify-api) into one full-agency workflow. Build features with structured planning and subagent-driven execution while running code-health scans and quality gates in the same pass.

## Architecture

```
superpowers (upstream, untouched)
  ^ invoked by name
super-deslop (this repo — bridge skill + plugin)
  v imports library
desloppify-api (standalone Python wrapper)
  v depends on
desloppify (upstream, untouched)
```

No upstream repos are modified. All four repos upgrade independently.

## Prerequisites

- [Superpowers](https://github.com/obra/superpowers) installed
- [Desloppify](https://github.com/peteromallet/desloppify) CLI: `pip install "desloppify[full]"`
- [desloppify-api](../desloppify-api): `pip install desloppify-api`
- Claude Code or OpenCode

## Installation

### OpenCode

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "super-deslop@git+https://github.com/<owner>/super-deslop.git"
  ]
}
```

## Usage

Tell your agent: "Build [feature] with code-quality hardening."

The workflow runs automatically:

1. **Bootstrap** — checks all prerequisites, guided install if needed, baseline scan
2. **Design** — `superpowers:brainstorming`
3. **Plan** — `superpowers:writing-plans` + Quality Intent section
4. **Implement** — `superpowers:subagent-driven-development` with:
   - Pre-task reuse checks via `desloppify-api`
   - Per-task file checks via `session.check_files()`
   - Per-batch scoped scans via `desloppify scan`
5. **Finish** — verify strict score >= baseline, then merge

## Testing

```bash
npm test
```

## License

MIT
