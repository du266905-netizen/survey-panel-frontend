import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  conversationsApiEnabled,
  createConversation,
  deleteConversation,
  getConversation,
  listConversations,
  saveDraft,
} from '../api/aiConversations';

/**
 * TanStack Query 管的是「服务端状态」：缓存、重试、失效、竞态。
 * 这些手写永远是同一批 bug，所以不手写。
 *
 * 接口没上线时（VITE_AI_CONVERSATIONS !== '1'），所有 hook 都不发请求，
 * 页面继续走原来的本地路径。
 */

const LIST_KEY = ['ai-conversations'];

export const useConversationList = () => useQuery({
  queryKey: LIST_KEY,
  queryFn: () => listConversations(20),
  enabled: conversationsApiEnabled,
  staleTime: 30_000,
  retry: 1,
});

export const useConversation = (id) => useQuery({
  queryKey: ['ai-conversation', id],
  queryFn: () => getConversation(id),
  enabled: conversationsApiEnabled && Boolean(id),
  staleTime: 0,
  retry: 1,
});

export const useCreateConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title) => createConversation(title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LIST_KEY }),
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteConversation(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: LIST_KEY }),
  });
};

export const useSaveDraft = () => useMutation({
  mutationFn: ({ id, payload }) => saveDraft(id, payload),
});
