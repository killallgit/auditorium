import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

// The seam is physical: see AGENTS.md "Engineering rules".
const forbid = (name, group) => ({
  'no-restricted-imports': ['error', { patterns: [{ group, message: `${name} must not import across the seam` }] }],
})

export default tseslint.config(
  { ignores: ['out/', 'dist/', 'node_modules/', '.beads/', '.agents/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.{ts,tsx}'], plugins: { 'react-hooks': reactHooks }, rules: reactHooks.configs.recommended.rules },
  {
    files: ['src/core/**'],
    rules: forbid('core', ['**/ui/**', '**/adapters/**', '**/app/**', 'react', 'react-dom', 'electron']),
  },
  {
    files: ['src/ui/**'],
    rules: forbid('ui', ['**/adapters/**', '**/app/**', 'electron']),
  },
)
