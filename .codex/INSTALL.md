# Installing Super Deslop for Codex

Follow these steps exactly. Do not skip any step.

## Step 1: Clone the super-deslop repo

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.codex/super-deslop
```

If the directory already exists, pull the latest instead:

```bash
cd ~/.codex/super-deslop && git pull --ff-only
```

## Step 2: Create skill symlinks

```bash
mkdir -p ~/.agents/skills
ln -sfn ~/.codex/super-deslop/skills/super-deslop ~/.agents/skills/super-deslop
```

## Step 3: Install superpowers (if not already installed)

Check if superpowers is installed:

```bash
ls ~/.agents/skills/superpowers/SKILL.md 2>/dev/null
```

If not found, install it:

```bash
git clone https://github.com/obra/superpowers.git ~/.codex/superpowers
ln -sfn ~/.codex/superpowers/skills ~/.agents/skills/superpowers
```

## Step 4: Install Python dependencies

```bash
pip install --upgrade "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

If `pip` is not found, try `pip3` instead.

## Step 5: Set up desloppify skill overlay for Codex

```bash
desloppify update-skill codex
```

## Step 6: Tell the user

Tell the user: "Super Deslop is installed. Restart Codex to activate. After restart, the super-deslop skill will be available automatically."
