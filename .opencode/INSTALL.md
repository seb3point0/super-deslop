# Installing Super Deslop for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- [Superpowers](https://github.com/obra/superpowers) plugin installed
- [Desloppify](https://github.com/peteromallet/desloppify) CLI: `pip install "desloppify[full]"`
- [Desloppify API](https://github.com/seb3point0/desloppify-api): `pip install git+https://github.com/seb3point0/desloppify-api.git`

## Installation

Add super-deslop to your `opencode.json`:

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "super-deslop@git+https://github.com/seb3point0/super-deslop.git"
  ]
}
```

Restart OpenCode. The bridge skill is discovered automatically.

## Dependency Chain

```
super-deslop (bridge skill + plugin)
  calls superpowers skills by name
  references desloppify-api for structured Python access
    depends on desloppify (upstream, untouched)
```

All three upstream repos are preserved independently. Update each separately.
