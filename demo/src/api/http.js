const DEFAULT_TIMEOUT = 15000

export class ApiError extends Error {
  constructor(message, details = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = details.status
    this.code = details.code
    this.payload = details.payload
  }
}

function getBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || ''
}

function joinUrl(baseUrl, path) {
  if (/^https?:\/\//i.test(path)) return path
  const base = String(baseUrl || '').replace(/\/+$/, '')
  const suffix = String(path || '').replace(/^\/+/, '')
  return base ? `${base}/${suffix}` : `/${suffix}`
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function normalizePayload(payload) {
  if (!payload || typeof payload !== 'object') return payload
  if ('success' in payload && payload.success === false) {
    throw new ApiError(payload.message || 'Request failed', {
      code: payload.code,
      payload,
    })
  }
  if (
    'code' in payload
    && payload.code !== 0
    && payload.code !== '0'
    && payload.code !== 200
    && payload.code !== '200'
  ) {
    throw new ApiError(payload.message || payload.msg || 'Request failed', {
      code: payload.code,
      payload,
    })
  }
  if ('data' in payload && ('code' in payload || 'success' in payload)) {
    return payload.data
  }
  return payload
}

async function parseResponse(response) {
  const text = await response.text()
  if (!text) return null

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return JSON.parse(text)
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function request(path, options = {}) {
  const {
    baseUrl = getBaseUrl(),
    timeout = DEFAULT_TIMEOUT,
    headers,
    body,
    raw = false,
    ...fetchOptions
  } = options

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeout)

  const requestHeaders = new Headers(headers || {})
  let requestBody = body

  if (isPlainObject(body) || Array.isArray(body)) {
    requestBody = JSON.stringify(body)
    if (!requestHeaders.has('content-type')) {
      requestHeaders.set('content-type', 'application/json')
    }
  }

  try {
    const response = await fetch(joinUrl(baseUrl, path), {
      ...fetchOptions,
      headers: requestHeaders,
      body: requestBody,
      signal: controller.signal,
    })
    const payload = await parseResponse(response)

    if (!response.ok) {
      throw new ApiError(`HTTP ${response.status}`, {
        status: response.status,
        payload,
      })
    }

    return raw ? payload : normalizePayload(payload)
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request timeout', { code: 'TIMEOUT' })
    }
    throw error
  } finally {
    window.clearTimeout(timer)
  }
}

export const api = {
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}
