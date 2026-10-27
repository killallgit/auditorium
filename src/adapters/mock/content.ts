import type { Rng } from './ports'

export const pick = <T>(rng: Rng, items: readonly T[]): T =>
  items[Math.floor(rng.next() * items.length)] as T

export const projectNames = [
  'kaiser-soze', 'billing-api', 'web-dashboard', 'mobile-app', 'infra-terraform',
  'data-pipeline', 'docs-site', 'auth-service', 'ml-experiments', 'design-system',
] as const
export const tools = ['claude', 'pi', 'codex'] as const
export const hosts = ['local', 'devbox-eu', 'build-farm-02', 'laptop-remote'] as const
export const titles = [
  'Fix flaky integration test', 'Add pagination to list endpoint', 'Refactor config loading',
  'Upgrade dependencies', 'Investigate memory leak', 'Write migration for users table',
  'Implement dark mode', 'Speed up CI pipeline',
] as const
export const lastTurns = [
  'I updated the handler and the tests pass locally.',
  'Refactored the module into three smaller files and updated imports.',
  'The build is green after pinning the transitive dependency.',
  'I found the root cause: a missing await in the retry loop.',
] as const
export const summaries = [
  'Tests are passing.', 'Refactor finished.', 'Build is green.', 'Found the root cause.',
] as const
export const questions = [
  'Should I also update the changelog?', 'Want me to open a pull request?',
  'Keep the old API as a deprecated alias?', 'Which environment should I deploy to?',
] as const
export const failReasons = ['Out of context', 'Tool crashed', 'Connection lost'] as const

export const fakeTranscript = (title: string, lines: readonly string[]): string =>
  [`# ${title}`, '', ...lines.flatMap((l, i) => [`[turn ${i + 1}] ${l}`, '']),
    'Further details: ran the full suite, inspected logs, and reviewed the diff.'].join('\n')
