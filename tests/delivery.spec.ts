import { expect, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// Delivery promises that a browser cannot see: what git ignores and what CI does.

test('private inputs are git-ignored', () => {
  for (const file of ['.env', 'resume.pdf', 'pic.webp']) {
    // `git check-ignore` exits 0 (and prints the path) only when the path is ignored.
    expect(execFileSync('git', ['check-ignore', file], { encoding: 'utf8' }).trim()).toBe(file);
  }
  const tracked = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).split('\n');
  expect(tracked.filter((f) => /(^|\/)(\.env(\..*)?|resume\.pdf|pic\.webp)$/.test(f))).toEqual([]);
});

test('a push to main builds with bun and publishes to GitHub Pages', () => {
  const workflow = readFileSync('.github/workflows/deploy.yml', 'utf8');
  expect(workflow).toMatch(/push:\s+branches: \[main\]/);
  expect(workflow).toContain('oven-sh/setup-bun');
  expect(workflow).toContain('bun run build');
  expect(workflow).toContain('actions/deploy-pages');
});
