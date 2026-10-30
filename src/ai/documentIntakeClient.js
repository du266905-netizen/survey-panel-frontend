import { apiClient } from '../api/client';

export const AI_DOCUMENT_MODE = String(
  import.meta.env?.VITE_AI_DOCUMENT_MODE || (import.meta.env?.DEV ? 'mock' : 'api'),
).toLowerCase();

export async function analyzeDocumentIntake({ file, responseLanguage }) {
  const form = new FormData();
  form.append('file', file);
  form.append('responseLanguage', responseLanguage);
  form.append('confirmedProcessing', 'true');
  const response = await apiClient.post('/api/business/ai-brief/document-intake', form, {
    timeout: 150000,
  });
  return response.data;
}
