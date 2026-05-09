// Compatibility wrapper. The canonical graph source is now the 50 IPC xlsx
// sheets converted by build_industry_chain_graph_from_xlsx.py.

import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const script = resolve(dirname(fileURLToPath(import.meta.url)), 'build_industry_chain_graph_from_xlsx.py')
const python = process.env.PYTHON || 'python'
const result = spawnSync(python, [script, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status ?? 0)
