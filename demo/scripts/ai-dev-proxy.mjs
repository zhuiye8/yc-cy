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
          'You are an analysis assistant for a Chinese industrial intelligence product.',
          'Return strict JSON only, no markdown.',
          'Fields: title, enhancedPrompt, summary, bullets, sources, caveat.',
          'Use Chinese for all user-facing text.',
          'bullets should be an array of 3 to 5 concise conclusions.',
          'sources should be an array of objects: id, label, description.',
          'When referencing sources in user-facing text, use paper-style numeric citations like [1], [2], never [S1] or [S2].',
          'Always keep a data-source concept. If no real retrieval result is provided, do not fabricate exact statistics; explain that verified retrieval should be attached by the backend data source.',
          'Never invent report names, exact percentages, exact counts, dates, source titles, or API result names when no retrieval payload is provided.',
          'When retrieval payload is missing, provide only an analysis framework, required data checklist, and follow-up questions.',
          'When retrieval payload exists, only use facts present in retrieval.tools[].data and retrieval.toolRegistry. Do not cite a source id unless that source is present in retrieval.sources.',
          'If a tool reports ok=false, treat it as unavailable and ask for the missing retrieval instead of inventing results.',
          'For company diligence: if companyRaw is missing but chain_org_search has results, do not say no data was retrieved. Present the retrieved candidate enterprises first, then ask the user to choose a target company for deeper diligence.',
          'If industrial chain nodes, enterprise distributions, talent region aggregation, or talent search results are retrieved, include them as partial evidence even when another required slot is missing.',
          'Available sources are limited to: industrial chain node repository, chain enterprise search, chain enterprise province/city distribution, talent region aggregation, talent search, and paper/patent outputs by talent id. /api/space/* is not deployed in the current service and must not be claimed as available.',
          'Do not promise policy search, standards search, fund/project search, journal recommendation, regional paper full-text search, regional patent full-text search, citation ranking, patent infringement judgment, or financial diligence unless the retrieval payload contains those facts.',
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
