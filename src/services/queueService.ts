import { apiClient, apiConfig, mockDelay } from './apiClient';
import { mockQueues } from '../mock';
import type { QueueInfo } from '../types';

export const queueService = {
  async getQueues(): Promise<QueueInfo[]> {
    if (apiConfig.useMock) {
      return mockDelay(mockQueues);
    }
    const { data } = await apiClient.get<QueueInfo[]>('/queues');
    return data;
  },

  async getQueue(id: string): Promise<QueueInfo | undefined> {
    if (apiConfig.useMock) {
      return mockDelay(mockQueues.find((q) => q.id === id));
    }
    const { data } = await apiClient.get<QueueInfo>(`/queues/${id}`);
    return data;
  },
};
