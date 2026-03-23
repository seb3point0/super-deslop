# Installing Super Deslop

## Step 1: Install Python dependencies

```bash
pip install "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

## Step 2: Install Superpowers (if not already installed)

Follow the instructions for your platform: https://github.com/obra/superpowers#installation

## Step 3: Install Super Deslop

### Claude Code

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.claude/super-deslop
mkdir -p ~/.claude/skills
ln -s ~/.claude/super-deslop/skills/super-deslop ~/.claude/skills/super-deslop
```

### OpenCode

Add to your `opencode.json`:

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "super-deslop@git+https://github.com/seb3point0/super-deslop.git"
  ]
}
```

### Codex

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.codex/super-deslop
mkdir -p ~/.agents/skills
ln -s ~/.codex/super-deslop/skills/super-deslop ~/.agents/skills/super-deslop
```

## Step 4: Restart your agent and verify

Ask: "Tell me about the super-deslop skill"
