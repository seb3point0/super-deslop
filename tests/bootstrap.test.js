import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizePath, extractAndStripFrontmatter, buildBootstrapContent } from '../src/bootstrap.js';

test('normalizePath expands home-relative paths', () => {
  assert.equal(normalizePath('~/skills', '/home/tester'), '/home/tester/skills');
});

test('normalizePath resolves bare relative paths', () => {
  const result = normalizePath('foo/bar', '/home/tester');
  assert.ok(result.endsWith('foo/bar'));
  assert.ok(result.startsWith('/'));
});

test('normalizePath returns null for empty input', () => {
  assert.equal(normalizePath('', '/home/tester'), null);
  assert.equal(normalizePath(null, '/home/tester'), null);
  assert.equal(normalizePath(undefined, '/home/tester'), null);
});

test('normalizePath handles ~ alone', () => {
  assert.equal(normalizePath('~', '/home/tester'), '/home/tester');
});

test('extractAndStripFrontmatter separates YAML and body', () => {
  const doc = '---\nname: demo\ndescription: Use when testing\n---\n\n# Demo\n';
  const result = extractAndStripFrontmatter(doc);
  assert.equal(result.frontmatter.name, 'demo');
  assert.match(result.content, /# Demo/);
});

test('extractAndStripFrontmatter handles no frontmatter', () => {
  const doc = '# Just markdown';
  const result = extractAndStripFrontmatter(doc);
  assert.deepEqual(result.frontmatter, {});
  assert.equal(result.content, doc);
});

test('buildBootstrapContent includes upstream tool names', () => {
  const content = buildBootstrapContent('/fake');
  assert.match(content, /superpowers/i);
  assert.match(content, /desloppify/i);
  assert.match(content, /desloppify-api/i);
});

test('buildBootstrapContent forbids silent fallback', () => {
  assert.match(buildBootstrapContent('/fake'), /do not silently fall back/i);
});
