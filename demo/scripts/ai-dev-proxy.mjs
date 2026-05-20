const DEFAULT_BASE_URL = 'https://api.deepseek.com'
const DEFAULT_MODEL = 'deepseek-v4-flash'

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(body))
      } catch (error) {
        reject(error)
      }
    })
    req.on('error', reject)
  })
}

function parseJsonContent(content) {
  if (!content || typeof content !== 'string') return {}
  const trimmed = content.trim()
  try {
    return JSON.parse(trimmed)
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/)
    if (!match) return { raw: content }
    try {
      return JSON.parse(match[0])
    } catch {
      return { raw: content }
    }
  }
}

function deepSeekConfig(env) {
  return {
    apiKey: env.DEEPSEEK_API_KEY,
    baseUrl: env.DEEPSEEK_BASE_URL || DEFAULT_BASE_URL,
    model: env.DEEPSEEK_MODEL || DEFAULT_MODEL,
    thinking: env.DEEPSEEK_THINKING || 'disabled',
  }
}

async function callDeepSeek(env, payload) {
  const config = deepSeekConfig(env)
  if (!config.apiKey) {
    const error = new Error('Missing DEEPSEEK_API_KEY')
    error.statusCode = 500
    throw error
  }

  const response = await fetch(`${config.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: config.model,
      thinking: { type: config.thinking },
      ...payload,
    }),
  })

  const text = await response.text()
  if (!response.ok) {
    const error = new Error(`DeepSeek HTTP ${response.status}`)
    error.statusCode = response.status
    error.payload = text
    throw error
  }

  const data = JSON.parse(text)
  return data?.choices?.[0]?.message?.content || ''
}

async function recognizeIntent(env, body) {
  const content = await callDeepSeek(env, {
    response_format: { type: 'json_object' },
    max_tokens: 800,
    messages: [
      {
        role: 'system',
        content: [
          'You are an intent recognizer for a Chinese industrial intelligence analysis product.',
          'Return strict JSON only, no markdown.',
          'Fields: intent, confidence, entities, missingSlots, candidateTemplates, nextQuestion.',
          'intent enum: chain_gap_analysis, company_diligence, literature_review, investment_list, general_question, unknown.',
          'entities fields: industryRaw, regionRaw, companyRaw, topicRaw, outputFormatRaw, dataSourcesRaw.',
          'candidateTemplates should contain 2 to 3 concise Chinese template names.',
          'nextQuestion should be a short Chinese question that helps the user fill missing information.',
        ].join('\n'),
      },
      {
        role: 'user',
        content: JSON.stringify({
          message: body.message || '',
          role: body.role || '',
          template: body.template || '',
        }),
      },
    ],
  })
  return parseJsonContent(content)
}

async function generateChat(env, body) {
  const content = await callDeepSeek(env, {
    response_format: { type: 'json_object' },
    max_tokens: 1600,
    messages: [
      {
        role: 'system',
        content: [
          'You are a Chinese industrial intelligence analyst. Write user-facing analysis as if you were a senior researcher briefing a client.',
          'Return strict JSON only, no markdown. Fields: title, enhancedPrompt, summary, bullets, sources, caveat. Use Chinese for all user-facing text.',
          '',
          'VOICE:',
          '- Confident analyst tone. Do not write as an AI explaining its limits.',
          '- Do not echo instructions back ("输出需注明…", "未检索项只列待查清单", "在数据完备前不宜…", "需后端扩展"). Just produce the analysis.',
          '',
          'SOURCES AND CITATIONS:',
          '- retrieval.sources entries use numeric ids 1, 2, 3, 4.',
          '- In summary/bullets/caveat, cite as [1], [2], [3]. Always use ASCII square brackets.',
          '- NEVER write S1/S2/S3/S4, "来源S1", "（来源 S2、S3）", or any "S+digit" pattern. NEVER mention internal tool names (chain_org_search, talent_region_aggregation, etc).',
          '- Only cite a source id when that source actually appears in retrieval.sources and retrieval.tools[].data backed it.',
          '',
          'SPARSE OR EMPTY RETRIEVAL:',
          '- Do not enumerate "缺失数据 ①②③" or "需补充以下数据" lists.',
          '- Do not ask the user to provide internal data — the user cannot access backend tables and lists like "请补充产业链节点库" are unhelpful.',
          '- When data is thin, still produce a useful analytical framework based on common industry knowledge, framed at the right altitude.',
          '- Put any "更多数据可深化分析" qualifier in the caveat field only. Keep it one sentence, no checklists, no source IDs.',
          '',
          'ANTI-HALLUCINATION:',
          '- Never invent specific report names, exact percentages, exact company/person/region counts, or exact dates that are not present in retrieval.tools[].data.',
          '- Available data scope is strictly: industrial chain nodes, chain enterprise search, province/city distribution, talent region aggregation, talent search, papers/patents by talent id. Never claim to use policy DBs, standards, funds, full-text journals, patent infringement judgment, financial diligence, or citation rankings.',
          '',
          'ENHANCEDPROMPT FIELD:',
          '- One short Chinese sentence framing the analytical task (e.g. "围绕全国半导体材料产业链的优势、短板与补链方向给出结论与依据。").',
          '- Do NOT echo system instructions, role labels, capability lists, or "输出要求…" lines. If there is no clean framing, return an empty string.',
          '',
          'BULLETS:',
          '- 3 to 5 substantive analytical findings. Each bullet reads like a paragraph from a research brief, not a checklist of what is missing.',
        ].join('\n'),
      },
      {
        role: 'user',
        content: JSON.stringify({
          question: body.question || '',
          prompt: body.prompt || '',
          role: body.role || '',
          template: body.template || '',
          intent: body.intent || null,
          retrieval: body.retrieval || null,
        }),
      },
    ],
  })
  return parseJsonContent(content)
}

function createHandler(env, type) {
  return async (req, res) => {
    if (req.method !== 'POST') {
      sendJson(res, 405, { success: false, message: 'Method not allowed' })
      return
    }

    try {
      const body = await readJson(req)
      const data = type === 'intent' ? await recognizeIntent(env, body) : await generateChat(env, body)
      sendJson(res, 200, { success: true, data })
    } catch (error) {
      sendJson(res, error.statusCode || 500, {
        success: false,
        message: error.message || 'AI proxy failed',
        detail: error.payload || undefined,
      })
    }
  }
}

export function aiDevProxyPlugin(env) {
  return {
    name: 'yc-ai-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/ai/intent', createHandler(env, 'intent'))
      server.middlewares.use('/api/ai/chat', createHandler(env, 'chat'))
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/ai/intent', createHandler(env, 'intent'))
      server.middlewares.use('/api/ai/chat', createHandler(env, 'chat'))
    },
  }
}
