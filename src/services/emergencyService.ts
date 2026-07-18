import { apiClient, apiConfig, mockDelay } from './apiClient';
import { mockEmergencies } from '../mock';
import type { EmergencyIncident } from '../types';

export const emergencyService = {
  async getIncidents(): Promise<EmergencyIncident[]> {
    if (apiConfig.useMock) {
      return mockDelay(mockEmergencies);
    }
    const { data } = await apiClient.get<EmergencyIncident[]>('/emergency');
    return data;
  },

  async reportIncident(payload: Partial<EmergencyIncident>): Promise<EmergencyIncident> {
    if (apiConfig.useMock) {
      return mockDelay({
        id: 'em_' + Date.now(),
        type: payload.type ?? 'medical',
        location: payload.location ?? 'Unknown',
        severity: payload.severity ?? 'medium',
        status: 'active',
        reportedAt: new Date().toISOString(),
        description: payload.description ?? '',
      });
    }
    const { data } = await apiClient.post<EmergencyIncident>('/emergency', payload);
    return data;
  },

  async updateIncidentStatus(id: string, status: EmergencyIncident['status']): Promise<EmergencyIncident> {
    if (apiConfig.useMock) {
      return mockDelay({
        ...mockEmergencies[0],
        id,
        status,
      });
    }
    const { data } = await apiClient.patch<EmergencyIncident>(`/emergency/${id}`, { status });
    return data;
  },
};
