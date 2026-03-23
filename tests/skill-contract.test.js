import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const skill = fs.readFileSync(path.join(ROOT, 'skills/super-deslop/SKILL.md'), 'utf8');

// --- Frontmatter ---

test('skill has valid YAML frontmatter', () => {
  assert.match(skill, /^---\n/);
  assert.match(skill, /name:\s*super-deslop/);
  assert.match(skill, /description:/);
});

test('skill description starts with "Use when"', () => {
  const m = skill.match(/description:\s*(.+)/);
  assert.ok(m);
  assert.match(m[1], /^Use when/i);
});

// --- Core workflow ---

test('skill declares full-agency execution', () => {
  assert.match(skill, /full.agency/i);
});

test('skill forbids silent fallback', () => {
  assert.match(skill, /do not silently fall back/i);
});

test('skill requires guided install', () => {
  assert.match(skill, /pip install.*desloppify/i);
  assert.match(skill, /pip install desloppify-api/i);
  assert.match(skill, /update-skill/i);
});

test('skill defines feature lane and health lane', () => {
  assert.match(skill, /feature lane/i);
  assert.match(skill, /health lane/i);
});

test('skill references desloppify next', () => {
  assert.match(skill, /desloppify next/i);
});

test('skill references desloppify scan', () => {
  assert.match(skill, /desloppify scan/i);
});

// --- Upstream delegation ---

test('delegates to superpowers:brainstorming', () => {
  assert.match(skill, /superpowers:brainstorming/);
});

test('delegates to superpowers:writing-plans', () => {
  assert.match(skill, /superpowers:writing-plans/);
});

test('delegates to superpowers:subagent-driven-development', () => {
  assert.match(skill, /superpowers:subagent-driven-development/);
});

test('delegates to superpowers:finishing-a-development-branch', () => {
  assert.match(skill, /superpowers:finishing-a-development-branch/);
});

// --- desloppify-api integration ---

test('skill references desloppify_api import', () => {
  assert.match(skill, /from desloppify_api import/);
});

test('skill documents DesloppifySession', () => {
  assert.match(skill, /DesloppifySession/);
});

test('skill documents check_files for per-task checks', () => {
  assert.match(skill, /check_files/);
  assert.match(skill, /Per-Task/i);
});

test('skill documents score_delta', () => {
  assert.match(skill, /score_delta/);
});

test('skill documents API vs CLI table', () => {
  assert.match(skill, /When to Use API vs CLI/i);
});

test('skill documents reuse check', () => {
  assert.match(skill, /Reuse Check/i);
});

// --- Scope control ---

test('skill requires baseline scan', () => {
  assert.match(skill, /baseline scan/i);
  assert.match(skill, /baseline strict score/i);
});

test('skill defines Quality Intent', () => {
  assert.match(skill, /quality intent/i);
  assert.match(skill, /touched paths/i);
  assert.match(skill, /slop risks/i);
});

test('skill defines finish gate', () => {
  assert.match(skill, /finish gate/i);
  assert.match(skill, /strict score/i);
});

// --- Anti-patterns ---

test('warns against repo-wide cleanup', () => {
  assert.match(skill, /repo-wide cleanup/i);
});

test('warns against skipping per-task checks', () => {
  assert.match(skill, /Skipping per-task file checks/i);
});
