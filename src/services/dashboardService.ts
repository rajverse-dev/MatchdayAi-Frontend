import { apiClient, mockDelay } from './apiClient';

import { mockDashboard } from '../mock';

import type {
  DashboardData,
  DashboardStats,
} from '../types';

export const dashboardService = {

  /*
   * Use existing frontend data for:
   * - Statistics
   * - Charts
   * - Announcements
   * - AI recommendation
   *
   * We are not calling /api/dashboard
   * because that endpoint does not exist yet.
   */
  async getDashboard(): Promise<DashboardData> {

    return mockDelay(
      mockDashboard
    );

  },


  /*
   * Get live statistics separately
   * from the Spring Boot backend.
   */
  async getDashboardStats():
    Promise<DashboardStats> {

    const { data } =
      await apiClient.get<DashboardStats>(
        '/dashboard/stats'
      );

    return data;

  },

};