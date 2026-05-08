import { api } from './http.js'

export async function createConversation(payload = {}) {
  return await api.post('/ai/conversations', payload)
}

export async function fetchConversations() {
  return await api.get('/ai/conversations')
}

export async function sendMessage(conversationId, message) {
  return await api.post(`/ai/conversations/${conversationId}/messages`, { message })
}
