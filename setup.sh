#!/usr/bin/env bash
# Super Deslop — one-command setup for any platform.
# Usage: curl -sSL https://raw.githubusercontent.com/seb3point0/super-deslop/main/setup.sh | bash
#
# Detects Claude Code, OpenCode, and Codex environments and installs accordingly.

set -euo pipefail

REPO_URL="https://github.com/seb3point0/super-deslop.git"
API_URL="https://github.com/seb3point0/desloppify-api.git"

echo "==> Installing Python dependencies..."
pip install "desloppify[full]" 2>/dev/null || pip3 install "desloppify[full]"
pip install "git+${API_URL}" 2>/dev/null || pip3 install "git+${API_URL}"

# Detect platform and install skill
if [ -d "$HOME/.claude" ] || [ -n "${CLAUDE_CODE:-}" ]; then
    echo "==> Detected Claude Code"
    INSTALL_DIR="$HOME/.claude/super-deslop"
    SKILL_DIR="$HOME/.claude/skills"
    if [ ! -d "$INSTALL_DIR" ]; then
        git clone "$REPO_URL" "$INSTALL_DIR"
    else
        echo "    Already cloned at $INSTALL_DIR, pulling latest..."
        git -C "$INSTALL_DIR" pull --ff-only
    fi
    mkdir -p "$SKILL_DIR"
    ln -sfn "$INSTALL_DIR/skills/super-deslop" "$SKILL_DIR/super-deslop"
    echo "==> Installed for Claude Code. Restart your session."

elif [ -d "$HOME/.codex" ] || [ -n "${CODEX_SANDBOX:-}" ]; then
    echo "==> Detected Codex"
    INSTALL_DIR="$HOME/.codex/super-deslop"
    SKILL_DIR="$HOME/.agents/skills"
    if [ ! -d "$INSTALL_DIR" ]; then
        git clone "$REPO_URL" "$INSTALL_DIR"
    else
        echo "    Already cloned at $INSTALL_DIR, pulling latest..."
        git -C "$INSTALL_DIR" pull --ff-only
    fi
    mkdir -p "$SKILL_DIR"
    ln -sfn "$INSTALL_DIR/skills/super-deslop" "$SKILL_DIR/super-deslop"
    echo "==> Installed for Codex. Restart your session."

else
    echo "==> Platform not auto-detected."
    echo "    For OpenCode: add to opencode.json plugin array:"
    echo '    "super-deslop@git+https://github.com/seb3point0/super-deslop.git"'
    echo "    For Claude Code: re-run with CLAUDE_CODE=1"
    echo "    For Codex: re-run with CODEX_SANDBOX=1"
fi

echo "==> Done. Python deps installed, skill linked."
