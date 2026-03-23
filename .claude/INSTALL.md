# Installing Super Deslop for Claude Code

Follow these steps exactly. Do not skip any step.

## Step 1: Clone the super-deslop repo

```bash
git clone https://github.com/seb3point0/super-deslop.git ~/.claude/super-deslop
```

If the directory already exists, pull the latest instead:

```bash
cd ~/.claude/super-deslop && git pull --ff-only
```

## Step 2: Create skill symlink

```bash
mkdir -p ~/.claude/skills
ln -sfn ~/.claude/super-deslop/skills/super-deslop ~/.claude/skills/super-deslop
```

## Step 3: Ensure superpowers is installed

Check if superpowers is installed:

```bash
ls ~/.claude/skills/superpowers/ 2>/dev/null
```

If not found, install it:

```bash
/plugin install superpowers@claude-plugins-official
```

Or manually:

```bash
git clone https://github.com/obra/superpowers.git ~/.claude/superpowers
ln -sfn ~/.claude/superpowers/skills ~/.claude/skills/superpowers
```

## Step 4: Install Python dependencies

```bash
pip install --upgrade "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

If `pip` is not found, try `pip3` instead.

## Step 5: Set up desloppify skill overlay for Claude

```bash
desloppify update-skill claude
```

## Step 6: Tell the user

Tell the user: "Super Deslop is installed. Restart Claude Code to activate. After restart, the super-deslop skill will be available automatically."
