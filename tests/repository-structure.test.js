import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

test('package.json exists and has correct shape', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  assert.equal(pkg.name, 'super-deslop');
  assert.equal(pkg.type, 'module');
  assert.ok(pkg.main);
  assert.ok(pkg.scripts?.test);
});

test('OpenCode plugin entrypoint exists', () => {
  assert.equal(fs.existsSync(path.join(ROOT, '.opencode/plugins/super-deslop.js')), true);
});

test('OpenCode install docs exist', () => {
  assert.equal(fs.existsSync(path.join(ROOT, '.opencode/INSTALL.md')), true);
});

test('Claude plugin metadata exists', () => {
  const pluginPath = path.join(ROOT, '.claude-plugin/plugin.json');
  assert.equal(fs.existsSync(pluginPath), true);
  const plugin = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  assert.equal(plugin.name, 'super-deslop');
});

test('.gitignore exists and covers node_modules', () => {
  assert.match(fs.readFileSync(path.join(ROOT, '.gitignore'), 'utf8'), /node_modules/);
});

test('bridge skill exists', () => {
  assert.equal(fs.existsSync(path.join(ROOT, 'skills/super-deslop/SKILL.md')), true);
});
