# Installing Super Deslop for Codex

## Prerequisites

- Codex CLI installed
- Superpowers installed (`~/.agents/skills/superpowers/` must exist)

## Steps

1. Clone the repo:
```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.codex/super-deslop
```

2. Create the skills symlink:
```bash
mkdir -p ~/.agents/skills
ln -s ~/.codex/super-deslop/skills/super-deslop ~/.agents/skills/super-deslop
```

3. Install Python dependencies:
```bash
pip install "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

4. Restart Codex.

## Verify

Ask Codex: "What skills do you have that mention desloppify?"

The `super-deslop` skill should appear in the list.
