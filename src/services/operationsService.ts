import { apiClient, apiConfig, mockDelay } from './apiClient';
import { mockOperations } from '../mock';
import type { OperationsData } from '../types';

export const operationsService = {
  async getOperations(): Promise<OperationsData> {
    if (apiConfig.useMock) {
      return mockDelay(mockOperations);
    }
    const { data } = await apiClient.get<OperationsData>('/operations');
    return data;
  },
};
