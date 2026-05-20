import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function loadEnv(filePath) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf8')
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const index = trimmed.indexOf('=')
    if (index === -1) continue
    const key = trimmed.slice(0, index).trim()
    const value = trimmed.slice(index + 1).trim()
    if (key && !(key in process.env)) process.env[key] = value
  }
}

loadEnv(resolve(process.cwd(), '.env.local'))

const apiKey = process.env.DEEPSEEK_API_KEY
const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
const model = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash'
const thinkingType = process.env.DEEPSEEK_THINKING || 'disabled'

if (!apiKey) {
  console.error('Missing DEEPSEEK_API_KEY in .env.local')
  process.exit(1)
}

const payload = {
  model,
  thinking: { type: thinkingType },
  response_format: { type: 'json_object' },
  max_tokens: 500,
  messages: [
    {
      role: 'system',
      content: [
        'You classify Chinese industrial intelligence questions.',
        'Return only JSON with keys: intent, confidence, entities, missingSlots, candidateTemplates.',
        'Do not include markdown.'
      ].join(' '),
    },
    {
      role: 'user',
      content: '帮我分析武汉机器人产业链短板，并给出可验证的数据来源',
    },
  ],
}

const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/chat/completions`, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${apiKey}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify(payload),
})

const text = await response.text()

if (!response.ok) {
  console.error(`DeepSeek request failed: HTTP ${response.status}`)
  console.error(text)
  process.exit(1)
}

const data = JSON.parse(text)
const content = data?.choices?.[0]?.message?.content || ''
console.log(content)
