import { apiClient, apiConfig, mockDelay } from './apiClient';
import { mockTransport } from '../mock';
import type { TransportOption } from '../types';

export const transportService = {
  async getOptions(): Promise<TransportOption[]> {
    if (apiConfig.useMock) {
      return mockDelay(mockTransport);
    }
    const { data } = await apiClient.get<TransportOption[]>('/transport');
    return data;
  },
};
