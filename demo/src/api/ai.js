import { api } from './http.js'

export async function recognizeAiIntent(payload = {}) {
  return await api.post('/ai/intent', payload)
}

export async function generateAiAnalysis(payload = {}) {
  return await api.post('/ai/chat', payload, { timeout: 45000 })
}

export async function createConversation(payload = {}) {
  return await api.post('/ai/conversations', payload)
}

export async function fetchConversations() {
  return await api.get('/ai/conversations')
}

export async function sendMessage(conversationId, message) {
  return await api.post(`/ai/conversations/${conversationId}/messages`, { message })
}
