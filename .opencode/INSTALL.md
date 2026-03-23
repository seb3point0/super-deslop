# Installing Super Deslop for OpenCode

Follow these steps exactly. Do not skip any step.

## Step 1: Add the plugins to opencode.json

Edit the user's `opencode.json` (global: `~/.config/opencode/opencode.json`, or project-level) to add both `superpowers` and `super-deslop` to the `plugin` array. If the file already has a `plugin` array, append to it. If superpowers is already present, only add super-deslop.

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "super-deslop@git+https://github.com/seb3point0/super-deslop.git"
  ]
}
```

## Step 2: Install Python dependencies

Run these commands:

```bash
pip install --upgrade "desloppify[full]"
pip install git+https://github.com/seb3point0/desloppify-api.git
```

If `pip` is not found, try `pip3` instead.

## Step 3: Set up desloppify skill overlay for OpenCode

```bash
desloppify update-skill opencode
```

## Step 4: Tell the user

Tell the user: "Super Deslop is installed. Restart OpenCode to activate the plugin. After restart, the super-deslop skill will be available automatically."
