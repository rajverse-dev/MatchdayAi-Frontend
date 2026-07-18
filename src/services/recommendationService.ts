import { apiClient } from './apiClient';
import type { AIRecommendation } from '../types';

export const recommendationService = {

  async getRecommendation():
    Promise<AIRecommendation> {

    const { data } =
      await apiClient.get<AIRecommendation>(
        '/recommendations'
      );

    return data;
  },

};