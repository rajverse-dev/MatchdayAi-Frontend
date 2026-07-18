import { apiClient, apiConfig, mockDelay } from './apiClient';
import { mockCrowdZones } from '../mock';
import type { CrowdZone } from '../types';

export const crowdService = {
  async getZones(): Promise<CrowdZone[]> {
    if (apiConfig.useMock) {
      return mockDelay(mockCrowdZones);
    }
    const { data } = await apiClient.get<CrowdZone[]>('/crowd');
    return data;
  },

  async getZone(id: string): Promise<CrowdZone | undefined> {
    if (apiConfig.useMock) {
      return mockDelay(mockCrowdZones.find((z) => z.id === id));
    }
    const { data } = await apiClient.get<CrowdZone>(`/crowd/${id}`);
    return data;
  },
};
