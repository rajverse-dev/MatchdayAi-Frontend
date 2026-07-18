import { apiClient, apiConfig, mockDelay } from './apiClient';
import { mockMapPoints, mockRoutes } from '../mock';
import type { MapPoint, RouteInfo } from '../types';

export const navigationService = {
  async getMapPoints(): Promise<MapPoint[]> {
    if (apiConfig.useMock) {
      return mockDelay(mockMapPoints);
    }
    const { data } = await apiClient.get<MapPoint[]>('/navigation/points');
    return data;
  },

  async getRoutes(): Promise<RouteInfo[]> {
    if (apiConfig.useMock) {
      return mockDelay(mockRoutes);
    }
    const { data } = await apiClient.get<RouteInfo[]>('/navigation/routes');
    return data;
  },

  async getRoute(from: string, to: string): Promise<RouteInfo | undefined> {
    if (apiConfig.useMock) {
      return mockDelay(
        mockRoutes.find((r) => r.from === from && r.to === to) ??
          { id: 'custom', from, to, distance: 250, estimatedTime: 3, accessibility: true },
      );
    }
    const { data } = await apiClient.get<RouteInfo>(`/navigation/route?from=${from}&to=${to}`);
    return data;
  },
};
