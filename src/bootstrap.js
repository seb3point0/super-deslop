/**
 * Bootstrap helpers for the super-deslop bridge.
 */

import path from 'node:path';

export function normalizePath(p, homeDir) {
  if (!p || typeof p !== 'string') return null;
  let normalized = p.trim();
  if (!normalized) return null;
  if (normalized.startsWith('~/')) {
    normalized = path.join(homeDir, normalized.slice(2));
  } else if (normalized === '~') {
    normalized = homeDir;
  }
  return path.resolve(normalized);
}

export function extractAndStripFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: raw };
  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};
  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }
  return { frontmatter, content: body };
}

export function buildBootstrapContent(skillsDir) {
  return `<SUPER_DESLOP>
You have access to the super-deslop bridge skill.

This skill composes three upstream tools into one full-agency workflow:
- **superpowers** for design, planning, and subagent-driven implementation
- **desloppify** for mechanical scanning, subjective review, and code-health verification
- **desloppify-api** for structured programmatic access to desloppify (per-task file checks, score deltas, etc.)

When the user asks to build a feature with code-quality hardening, or to combine
planning with desloppify loops, invoke the super-deslop skill.

The bridge requires all three upstream tools. If any is missing, the skill will
guide you through installation. Do not silently fall back to partial workflows.

Skills location: ${skillsDir}
</SUPER_DESLOP>`;
}
