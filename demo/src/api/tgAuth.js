const TG_BASE_URL = import.meta.env.VITE_TG_API_BASE_URL || '/tg-api'

const TG_USERNAME = 'yichang_888_20260414'
const TG_PASSWORD = 'epk#w55ujo66IHHhmYKXQhNnal'

const STORAGE_TOKEN_KEY = 'tg_token'
const STORAGE_EXPIRES_KEY = 'tg_token_expires'
const REFRESH_BUFFER_MS = 60 * 1000

let pendingTokenPromise = null

function isTokenValid() {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY)
  if (!token) return false

  const expiresAt = localStorage.getItem(STORAGE_EXPIRES_KEY)
  if (!expiresAt) return true
  const expiresMs = new Date(expiresAt).getTime()
  return Date.now() < expiresMs - REFRESH_BUFFER_MS
}

async function fetchNewToken() {
  const response = await fetch(`${TG_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: TG_USERNAME, password: TG_PASSWORD }),
  })

  if (!response.ok) throw new Error(`TG login failed: HTTP ${response.status}`)

  const payload = await response.json()
  const data = payload?.data
  if (!data?.token) throw new Error('TG login: no token in response')

  localStorage.setItem(STORAGE_TOKEN_KEY, data.token)
  if (data.expiresAt) localStorage.setItem(STORAGE_EXPIRES_KEY, data.expiresAt)
  return data.token
}

export async function getTgToken() {
  if (isTokenValid()) return localStorage.getItem(STORAGE_TOKEN_KEY)
  if (pendingTokenPromise) return pendingTokenPromise

  pendingTokenPromise = fetchNewToken().finally(() => {
    pendingTokenPromise = null
  })
  return pendingTokenPromise
}

export function clearTgToken() {
  localStorage.removeItem(STORAGE_TOKEN_KEY)
  localStorage.removeItem(STORAGE_EXPIRES_KEY)
}

export async function tgFetchWithAuth(path, options = {}) {
  const makeRequest = async () => {
    const token = await getTgToken()
    return fetch(`${TG_BASE_URL}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    })
  }

  let response = await makeRequest()
  if (response.status === 401) {
    clearTgToken()
    response = await makeRequest()
  }
  return response
}
