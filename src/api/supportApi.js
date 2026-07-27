import { apiClient } from './client';

export async function sendSupportMessage(messages) {
  const response = await apiClient.post('/api/support/chat', { messages });
  return { data: response.data };
}

export async function createSupportTicket(payload) {
  const response = await apiClient.post('/api/support/handoff', payload);
  return { data: response.data.ticket };
}

export async function getSupportTickets(params = {}) {
  const response = await apiClient.get('/api/admin/support/tickets', { params });
  return { data: response.data.items || [] };
}

export async function updateSupportTicket(ticketId, payload) {
  const response = await apiClient.patch(`/api/admin/support/tickets/${encodeURIComponent(ticketId)}`, payload);
  return { data: response.data.ticket };
}
